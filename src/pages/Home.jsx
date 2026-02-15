import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, CheckCircle2, BarChart3, Lock, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex items-center pt-20 pb-12 sm:pt-0 sm:pb-0 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-adf4198c868f?w=500&h=400&fit=crop"
                alt="Dashboard"
                className="rounded-lg w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Contaux</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8">Gestão Financeira & Jurídica Integrada</p>
              <p className="text-base sm:text-lg text-blue-200 mb-8">Solução completa para contabilidade, gestão de processos legais e administração financeira da sua empresa.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  to={createPageUrl('Contact')}
                  className="inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  Começar Agora <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  to={createPageUrl('About')}
                  className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Recursos Principais</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">Tudo que sua empresa precisa para gerenciar finanças e processos legais com segurança e eficiência</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <BarChart3 className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Controle Financeiro</h3>
              <p className="text-sm sm:text-base text-slate-600">Gerencie invoices, pagamentos e fluxo de caixa em tempo real</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Gestão de Clientes</h3>
              <p className="text-sm sm:text-base text-slate-600">Organize informações de clientes com relatórios detalhados</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Lock className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Segurança Total</h3>
              <p className="text-sm sm:text-base text-slate-600">Dados protegidos com criptografia de ponta a ponta</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Automações</h3>
              <p className="text-sm sm:text-base text-slate-600">Automatize tarefas repetitivas e ganhe produtividade</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle2 className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Conformidade Legal</h3>
              <p className="text-sm sm:text-base text-slate-600">Gerenciamento de processos legais e prazos críticos</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <BarChart3 className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Relatórios Avançados</h3>
              <p className="text-sm sm:text-base text-slate-600">Análises detalhadas e insights para melhor tomada de decisão</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">500+</p>
              <p className="text-base sm:text-lg text-blue-100">Empresas Confiando</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">10M+</p>
              <p className="text-base sm:text-lg text-blue-100">Transações Processadas</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">24/7</p>
              <p className="text-base sm:text-lg text-blue-100">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Pronto para Começar?</h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8">Teste grátis por 30 dias. Sem cartão de crédito necessário.</p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Acessar Dashboard <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}