import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ClipboardCopy({ text, label, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <code className="flex-1 text-xs bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded font-mono break-all">
        {text}
      </code>
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="sm"
        className="shrink-0"
        title={copied ? 'Copiado!' : `Copiar ${label || 'texto'}`}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}