import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Trash2, Building2, ChevronDown, ChevronRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ChartOfAccounts() {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('client_id');
  const [showForm, setShowForm] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState({ Asset: true, Liability: true, Equity: true, Revenue: true, Expense: true });
  const [formData, setFormData] = useState({
    account_number: '',
    account_name: '',
    account_type: 'Asset',
    description: '',
  });
  const queryClient = useQueryClient();

  const { data: client } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => base44.entities.Client.filter({ id: clientId }),
    enabled: !!clientId,
  });

  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts', clientId],
    queryFn: () => base44.entities.Account.filter({ client_id: clientId }),
    enabled: !!clientId,
  });

  const accountsByType = useMemo(() => {
    const grouped = {
      Asset: [],
      Liability: [],
      Equity: [],
      Revenue: [],
      Expense: [],
    };
    accounts?.forEach((acc) => {
      if (grouped[acc.account_type]) {
        grouped[acc.account_type].push(acc);
      }
    });
    return grouped;
  }, [accounts]);

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Account.create({ ...data, client_id: clientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts', clientId] });
      setShowForm(false);
      setFormData({
        account_number: '',
        account_name: '',
        account_type: 'Asset',
        description: '',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Account.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts', clientId] }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const toggleType = (type) => {
    setExpandedTypes({ ...expandedTypes, [type]: !expandedTypes[type] });
  };

  if (!clientId) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Please select a client</p>
          <Link to={createPageUrl('Clients')}>
            <Button className="mt-4">Back to Clients</Button>
          </Link>
        </div>
      </div>
    );
  }

  const clientName = client?.[0]?.company_name || 'Loading...';

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to={createPageUrl('Clients')} className="text-blue-600 hover:underline text-sm mb-4 inline-block">
            ← Back to Clients
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Chart of Accounts</h1>
              <p className="text-slate-600 mt-1">{clientName}</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" />
              Add Account
            </Button>
          </div>
        </div>

        {/* Accounts by Type */}
        {isLoading ? (
          <div className="text-center py-12">Loading accounts...</div>
        ) : (
          <div className="space-y-4">
            {Object.entries(accountsByType).map(([type, typeAccounts]) => (
              <div key={type} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleType(type)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedTypes[type] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    <h3 className="text-lg font-semibold text-slate-900">{type}s</h3>
                    <span className="text-sm text-slate-600">({typeAccounts.length})</span>
                  </div>
                </button>

                {expandedTypes[type] && typeAccounts.length > 0 && (
                  <div className="border-t border-slate-200">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Number</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Description</th>
                          <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">Balance</th>
                          <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {typeAccounts.map((account) => (
                          <tr key={account.id} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="px-6 py-4 text-sm font-mono text-slate-900">{account.account_number}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{account.account_name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{account.description || '-'}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                              ${(account.balance || 0).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => deleteMutation.mutate(account.id)}
                                className="text-red-600 hover:text-red-700 inline-flex items-center"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {expandedTypes[type] && typeAccounts.length === 0 && (
                  <div className="px-6 py-4 text-sm text-slate-600">No accounts yet</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Account Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Account Number *</label>
              <Input
                required
                value={formData.account_number}
                onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Account Name *</label>
              <Input
                required
                value={formData.account_name}
                onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                placeholder="Cash"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Type *</label>
              <select
                required
                value={formData.account_type}
                onChange={(e) => setFormData({ ...formData, account_type: e.target.value })}
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
              >
                <option value="Asset">Asset</option>
                <option value="Liability">Liability</option>
                <option value="Equity">Equity</option>
                <option value="Revenue">Revenue</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}