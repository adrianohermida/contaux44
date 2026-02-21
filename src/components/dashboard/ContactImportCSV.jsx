import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ContactImportCSV({ workspaceId, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();

  const importMutation = useMutation({
    mutationFn: async (contacts) => {
      const results = await Promise.allSettled(
        contacts.map(contact => 
          base44.entities.Client.create({ ...contact, tenant_id: workspaceId })
        )
      );
      return results;
    },
    onSuccess: (results) => {
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      
      if (failed === 0) {
        alert(`✅ ${succeeded} contatos importados com sucesso!`);
        onClose();
      } else {
        alert(`⚠️ ${succeeded} importados, ${failed} falharam. Verifique os erros.`);
      }
    },
  });

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setErrors([]);

    // Upload file and extract data
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });
      
      const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: "object",
          properties: {
            company_name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            client_type: { type: "string", enum: ["pf", "pj"] },
            cnpj: { type: "string" },
            cpf: { type: "string" },
            status: { type: "string", enum: ["active", "inactive"] },
          }
        }
      });

      if (result.status === 'success' && Array.isArray(result.output)) {
        setPreview(result.output);
      } else {
        setErrors(['Erro ao processar arquivo: ' + (result.details || 'Formato inválido')]);
      }
    } catch (error) {
      setErrors(['Erro ao fazer upload: ' + error.message]);
    }
  };

  const handleImport = () => {
    const validContacts = preview.filter(c => c.company_name && c.email);
    if (validContacts.length === 0) {
      setErrors(['Nenhum contato válido encontrado']);
      return;
    }
    importMutation.mutate(validContacts);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Importar Contatos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload */}
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Arraste um arquivo CSV/Excel ou clique para selecionar
          </p>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" asChild>
              <span>Selecionar Arquivo</span>
            </Button>
          </label>
          {file && (
            <p className="text-sm text-green-600 mt-2">
              <CheckCircle2 className="w-4 h-4 inline mr-1" />
              {file.name}
            </p>
          )}
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                {errors.map((error, i) => (
                  <p key={i} className="text-sm text-red-800 dark:text-red-200">{error}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preview */}
        {preview.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Preview ({preview.length} contatos)</h3>
            <div className="max-h-60 overflow-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">Nome</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 10).map((contact, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-3 py-2">{contact.company_name}</td>
                      <td className="px-3 py-2">{contact.email}</td>
                      <td className="px-3 py-2">{contact.client_type || 'pj'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {preview.length > 10 && (
                <p className="text-xs text-slate-500 p-2 text-center">
                  +{preview.length - 10} contatos...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleImport}
            disabled={preview.length === 0 || importMutation.isPending}
            className="flex-1"
          >
            {importMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Importar {preview.length > 0 && `(${preview.length})`}
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 pt-4 border-t">
          <p className="font-semibold">Formato esperado:</p>
          <p>• Colunas: company_name, email, phone, client_type (pf/pj), cnpj, cpf, status</p>
          <p>• Obrigatórios: company_name, email</p>
          <p>• Encoding: UTF-8</p>
        </div>
      </CardContent>
    </Card>
  );
}