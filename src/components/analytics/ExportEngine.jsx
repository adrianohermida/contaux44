import React, { useState, useCallback } from 'react';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

/**
 * Export Engine - Exporta dados em múltiplos formatos
 * CSV, Excel, PDF, JSON
 */
export default function ExportEngine({ data, fileName = 'report' }) {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(null);

  const exportAsCSV = useCallback(async () => {
    setExporting(true);
    try {
      const csv = generateCSV(data);
      downloadFile(csv, `${fileName}.csv`, 'text/csv');
      setExported('csv');
      setTimeout(() => setExported(null), 2000);
    } finally {
      setExporting(false);
    }
  }, [data, fileName]);

  const exportAsJSON = useCallback(async () => {
    setExporting(true);
    try {
      const json = JSON.stringify(data, null, 2);
      downloadFile(json, `${fileName}.json`, 'application/json');
      setExported('json');
      setTimeout(() => setExported(null), 2000);
    } finally {
      setExporting(false);
    }
  }, [data, fileName]);

  const exportAsPDF = useCallback(async () => {
    setExporting(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text(`Relatório: ${fileName}`, 10, 10);
      doc.setFontSize(10);
      
      const dataStr = JSON.stringify(data, null, 2);
      const lines = doc.splitTextToSize(dataStr, 190);
      doc.text(lines, 10, 20);
      
      doc.save(`${fileName}.pdf`);
      setExported('pdf');
      setTimeout(() => setExported(null), 2000);
    } finally {
      setExporting(false);
    }
  }, [data, fileName]);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Exportar Relatório</p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={exportAsCSV}
          disabled={exporting}
          className="flex items-center gap-2"
        >
          {exported === 'csv' ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              Exportado
            </>
          ) : exporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              CSV
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              CSV
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={exportAsJSON}
          disabled={exporting}
          className="flex items-center gap-2"
        >
          {exported === 'json' ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              Exportado
            </>
          ) : exporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              JSON
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              JSON
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={exportAsPDF}
          disabled={exporting}
          className="flex items-center gap-2"
        >
          {exported === 'pdf' ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              Exportado
            </>
          ) : exporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              PDF
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function generateCSV(data) {
  if (Array.isArray(data) && data.length === 0) return 'No data';

  if (Array.isArray(data)) {
    const headers = Object.keys(data[0]);
    const rows = data.map(item =>
      headers.map(h => JSON.stringify(item[h] || '')).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  } else {
    const headers = Object.keys(data);
    const values = headers.map(h => JSON.stringify(data[h] || '')).join(',');
    return [headers.join(','), values].join('\n');
  }
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}