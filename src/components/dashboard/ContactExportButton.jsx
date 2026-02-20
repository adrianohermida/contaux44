import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactExportButton({ contacts }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const headers = ['Nome', 'Email', 'Telefone', 'Tipo', 'CPF/CNPJ', 'Status', 'Endereço', 'Cidade', 'UF'];
      const rows = contacts.map(c => [
        c.company_name,
        c.email,
        c.phone || '',
        c.client_type === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica',
        c.client_type === 'pf' ? c.cpf || '' : c.cnpj || '',
        c.status === 'active' ? 'Ativo' : 'Inativo',
        c.endereco || '',
        c.cidade || '',
        c.uf || '',
      ]);

      const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `contatos-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting || contacts.length === 0}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Exportando...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Exportar CSV
        </>
      )}
    </Button>
  );
}