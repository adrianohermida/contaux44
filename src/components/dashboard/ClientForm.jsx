import React, { useState, useCallback, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function ClientForm({ client, onSave, onCancel, tenantId }) {
  const initialFormData = useMemo(() => client || {
    tenant_id: tenantId,
    company_name: '',
    email: '',
    phone: '',
    address: '',
    fiscal_year_start: '',
    currency: 'BRL',
    status: 'active'
  }, [client, tenantId]);

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (client?.id) {
        await base44.entities.Client.update(client.id, formData);
      } else {
        await base44.entities.Client.create(formData);
      }
      onSave();
    } finally {
      setLoading(false);
    }
  }, [client, formData, onSave]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{client ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Razão Social"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Endereço"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              label="Início do Ano Fiscal"
              type="date"
              name="fiscal_year_start"
              value={formData.fiscal_year_start}
              onChange={handleChange}
            />
            <Select value={formData.currency} onValueChange={(value) => handleSelectChange('currency', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Moeda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">Real (BRL)</SelectItem>
                <SelectItem value="USD">Dólar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}