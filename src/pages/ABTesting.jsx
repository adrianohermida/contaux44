import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Trash2, Check, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ABTesting() {
  const [experiments, setExperiments] = useState([
    {
      id: 1,
      name: 'CTA Button Color Test',
      description: 'Testando cor do botão de chamada para ação',
      status: 'running',
      variant_a: { name: 'Azul', conversions: 145, visitors: 2341 },
      variant_b: { name: 'Verde', conversions: 178, visitors: 2389 },
      startDate: '2026-02-15',
      endDate: '2026-02-25',
      confidence: 94.2,
    },
    {
      id: 2,
      name: 'Blog Title Length',
      description: 'Títulos curtos vs títulos longos',
      status: 'running',
      variant_a: { name: 'Curto (≤50 chars)', conversions: 89, visitors: 1234 },
      variant_b: { name: 'Longo (>50 chars)', conversions: 102, visitors: 1198 },
      startDate: '2026-02-18',
      endDate: null,
      confidence: 78.5,
    },
    {
      id: 3,
      name: 'Hero Image Size',
      description: 'Tamanho da imagem hero na página',
      status: 'completed',
      variant_a: { name: 'Pequena', conversions: 234, visitors: 5123 },
      variant_b: { name: 'Grande', conversions: 289, visitors: 5067 },
      startDate: '2026-02-01',
      endDate: '2026-02-14',
      confidence: 99.1,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    variant_a_name: '',
    variant_b_name: '',
  });

  const calculateConversionRate = (conversions, visitors) => {
    return ((conversions / visitors) * 100).toFixed(2);
  };

  const handleAddExperiment = () => {
    if (!formData.name || !formData.variant_a_name || !formData.variant_b_name) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const newExperiment = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      status: 'running',
      variant_a: { name: formData.variant_a_name, conversions: 0, visitors: 0 },
      variant_b: { name: formData.variant_b_name, conversions: 0, visitors: 0 },
      startDate: new Date().toISOString().split('T')[0],
      endDate: null,
      confidence: 0,
    };

    setExperiments([...experiments, newExperiment]);
    setFormData({ name: '', description: '', variant_a_name: '', variant_b_name: '' });
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    const styles = {
      running: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      paused: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    };
    return styles[status] || styles.paused;
  };

  const getWinner = (variantA, variantB) => {
    const rateA = calculateConversionRate(variantA.conversions, variantA.visitors);
    const rateB = calculateConversionRate(variantB.conversions, variantB.visitors);
    return parseFloat(rateB) > parseFloat(rateA) ? 'b' : 'a';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">A/B Testing</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Otimize com testes estatísticos</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" /> Novo Experimento
        </Button>
      </div>

      {/* New Experiment Form */}
      {showForm && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Experimento</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                  placeholder="Ex: Teste de Cor de Botão"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                  placeholder="Descrição do teste"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Variante A</label>
                  <input
                    type="text"
                    value={formData.variant_a_name}
                    onChange={(e) => setFormData({ ...formData, variant_a_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                    placeholder="Ex: Azul"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Variante B</label>
                  <input
                    type="text"
                    value={formData.variant_b_name}
                    onChange={(e) => setFormData({ ...formData, variant_b_name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                    placeholder="Ex: Verde"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleAddExperiment} className="flex-1">Criar Experimento</Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">Cancelar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experiments List */}
      <div className="space-y-4">
        {experiments.map((exp) => {
          const rateA = calculateConversionRate(exp.variant_a.conversions, exp.variant_a.visitors);
          const rateB = calculateConversionRate(exp.variant_b.conversions, exp.variant_b.visitors);
          const winner = getWinner(exp.variant_a, exp.variant_b);

          return (
            <Card key={exp.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{exp.name}</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{exp.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(exp.status)}`}>
                    {exp.status}
                  </span>
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                    <Trash2 className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Variant A */}
                  <div className={`p-4 rounded-lg border-2 ${winner === 'a' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{exp.variant_a.name}</h3>
                      {winner === 'a' && exp.status === 'completed' && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Conversões</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{exp.variant_a.conversions}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Visitantes</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{exp.variant_a.visitors.toLocaleString('pt-BR')}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Taxa de Conversão</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{rateA}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div className={`p-4 rounded-lg border-2 ${winner === 'b' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{exp.variant_b.name}</h3>
                      {winner === 'b' && exp.status === 'completed' && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Conversões</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{exp.variant_b.conversions}</p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Visitantes</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{exp.variant_b.visitors.toLocaleString('pt-BR')}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-xs text-slate-600 dark:text-slate-400">Taxa de Conversão</p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">{rateB}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confidence & Meta */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Nível de Confiança</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{exp.confidence}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Período</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {exp.startDate} {exp.endDate ? `até ${exp.endDate}` : '(em andamento)'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}