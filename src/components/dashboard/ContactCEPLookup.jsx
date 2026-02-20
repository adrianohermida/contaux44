import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactCEPLookup({ cep, onAddressFound, disabled }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLookupCEP = async () => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) {
      setError('CEP inválido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const clean = cep.replace(/\D/g, '');
      const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        return;
      }

      onAddressFound({
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      });
    } catch (err) {
      setError('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={handleLookupCEP}
          disabled={disabled || loading || !cep}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Buscar CEP
            </>
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}