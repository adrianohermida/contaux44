import React, { useState, useRef } from 'react';
import { Upload, File, Download, Trash2, Paperclip, FileText, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const FILE_CATEGORIES = [
  { value: 'contrato', label: 'Contrato' },
  { value: 'certidao', label: 'Certidão' },
  { value: 'fiscal', label: 'Documento Fiscal' },
  { value: 'proposta', label: 'Proposta' },
  { value: 'outro', label: 'Outro' },
];

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getFileIcon(fileType) {
  if (fileType?.startsWith('image/')) return Image;
  if (fileType?.includes('pdf')) return FileText;
  return File;
}

export default function ContactAttachments({ contactId, workspaceId }) {
  const [showDialog, setShowDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('outro');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: attachments = [], isLoading } = useQuery({
    queryKey: ['contact-attachments', contactId],
    queryFn: () => base44.entities.ContactAttachment.filter({ contact_id: contactId }),
    enabled: !!contactId,
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, description, category }) => {
      setUploading(true);
      try {
        // Upload file
        const { file_url } = await base44.integrations.Core.UploadFile({ file });

        // Create attachment record
        const attachment = await base44.entities.ContactAttachment.create({
          workspace_id: workspaceId,
          contact_id: contactId,
          file_url,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          description: description || '',
          category,
        });

        // Create activity
        await base44.entities.ContactActivity.create({
          workspace_id: workspaceId,
          contact_id: contactId,
          activity_type: 'edit',
          description: `Arquivo anexado: ${file.name}`,
          metadata: {
            attachment_id: attachment.id,
            file_name: file.name,
            file_size: file.size,
            category,
          },
        });

        return attachment;
      } finally {
        setUploading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-attachments'] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities'] });
      handleCloseDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (attachment) => {
      await base44.entities.ContactAttachment.delete(attachment.id);

      // Create activity
      await base44.entities.ContactActivity.create({
        workspace_id: workspaceId,
        contact_id: contactId,
        activity_type: 'edit',
        description: `Arquivo removido: ${attachment.file_name}`,
        metadata: {
          attachment_id: attachment.id,
          file_name: attachment.file_name,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-attachments'] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities'] });
    },
  });

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedFile(null);
    setDescription('');
    setCategory('outro');
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande. Máximo: 10MB');
        return;
      }
      setSelectedFile(file);
      setShowDialog(true);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    uploadMutation.mutate({ file: selectedFile, description, category });
  };

  const handleDownload = (attachment) => {
    window.open(attachment.file_url, '_blank');
  };

  const handleDelete = (attachment) => {
    if (window.confirm(`Deletar o arquivo "${attachment.file_name}"?`)) {
      deleteMutation.mutate(attachment);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Arquivos Anexados</h3>
        <Button onClick={() => fileInputRef.current?.click()} size="sm" className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Arquivo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-slate-500 py-8">Carregando...</p>
      ) : attachments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Paperclip className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
              Nenhum arquivo anexado
            </p>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload primeiro arquivo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {attachments.map((attachment) => {
            const Icon = getFileIcon(attachment.file_type);
            const categoryLabel = FILE_CATEGORIES.find(c => c.value === attachment.category)?.label || 'Outro';

            return (
              <Card key={attachment.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {attachment.file_name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {categoryLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {formatFileSize(attachment.file_size)} • Enviado em {new Date(attachment.created_date).toLocaleDateString()}
                      </p>
                      {attachment.description && (
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
                          {attachment.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleDownload(attachment)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(attachment)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={(o) => !o && handleCloseDialog()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload de Arquivo</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedFile && (
              <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <File className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-slate-600">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800"
              >
                {FILE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descrição (opcional)</label>
              <Input
                placeholder="Ex: Contrato de prestação de serviços 2024"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCloseDialog} variant="outline" disabled={uploading}>
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Fazer Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}