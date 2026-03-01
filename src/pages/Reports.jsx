import React from 'react';
import { useGlobalAuth } from '@/components/auth/useGlobalAuth';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BarChart3, Zap, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * REPORTS - NAVIGATION HUB
 * Central portal to 3 report modules:
 * - Analytics (core metrics)
 * - Advanced (AI, automation)
 * - Operations (security, monitoring)
 */
export default function Reports() {
  const { loading: authLoading } = useGlobalAuth('internal');

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Relatórios & Análises</h1>
        <p className="text-xl text-slate-600">Escolha o módulo de relatórios desejado</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Analytics Module */}
        <Link to={createPageUrl('ReportsAnalytics')} className="group">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-8 space-y-4 border-t-4 border-blue-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
              <p className="text-slate-600 mt-2">
                Dashboard de análises com métricas principais, previsões de receita, insights de clientes e comparativos.
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              Explorar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Advanced Module */}
        <Link to={createPageUrl('ReportsAdvanced')} className="group">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-8 space-y-4 border-t-4 border-purple-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Avançado</h2>
              <p className="text-slate-600 mt-2">
                IA Report Builder, automação de relatórios, agendamento de tarefas e análises customizadas com LLM.
              </p>
            </div>
            <div className="flex items-center gap-2 text-purple-600 font-semibold">
              Explorar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Operations Module */}
        <Link to={createPageUrl('ReportsOperations')} className="group">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-8 space-y-4 border-t-4 border-amber-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Operações</h2>
              <p className="text-slate-600 mt-2">
                Segurança, monitoramento, compliance, RBAC, alertas, CI/CD pipeline e infraestrutura.
              </p>
            </div>
            <div className="flex items-center gap-2 text-amber-600 font-semibold">
              Explorar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-50 rounded-lg p-8 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">📊 Modularização em Progresso</h3>
        <p className="text-slate-600">
          O módulo de Relatórios foi refatorado de 44 tabs em um único arquivo para 3 módulos temáticos independentes. 
          Isso melhora significativamente a UX, performance e manutenibilidade do código.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-slate-600">Analytics</p>
            <p className="text-2xl font-bold text-blue-600">5 tabs</p>
          </div>
          <div className="bg-white p-4 rounded border-l-4 border-purple-500">
            <p className="text-sm font-semibold text-slate-600">Advanced</p>
            <p className="text-2xl font-bold text-purple-600">3 tabs</p>
          </div>
          <div className="bg-white p-4 rounded border-l-4 border-amber-500">
            <p className="text-sm font-semibold text-slate-600">Operations</p>
            <p className="text-2xl font-bold text-amber-600">6 tabs</p>
          </div>
        </div>
      </div>
    </div>
  );
}