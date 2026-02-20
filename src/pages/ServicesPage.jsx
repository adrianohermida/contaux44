import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: '⚖️',
    title: 'Gestão de Processos Judiciais',
    desc: 'Organize e acompanhe todos os processos com prazos automáticos, documentação centralizada e atualizações de status em tempo real.',
    details: ['Acompanhamento de audiências', 'Controle de prazos processuais', 'Arquivo digital de documentos', 'Alertas automáticos de vencimentos']
  },
  {
    icon: '📊',
    title: 'Gestão Financeira Integrada',
    desc: 'Dashboard completo com fluxo de caixa, receitas, despesas e análise de rentabilidade por cliente e projeto.',
    details: ['Faturamento automatizado', 'Relatórios financeiros', 'Análise de lucratividade', 'Previsão de caixa']
  },
  {
    icon: '👥',
    title: 'CRM para Clientes',
    desc: 'Banco de dados centralizado de clientes (PF e PJ) com histórico completo de interações, documentos e contratos.',
    details: ['Cadastro PF e PJ', 'Histórico de comunicações', 'Armazenamento de documentos', 'Portal do cliente']
  },
  {
    icon: '📋',
    title: 'Faturamento e Cobranças',
    desc: 'Emita invoices automáticas, acompanhe pagamentos e gere relatórios de contas a receber com facilidade.',
    details: ['Geração de faturas', 'Rastreamento de pagamentos', 'Lembretes automáticos', 'Relatórios detalhados']
  },
  {
    icon: '📈',
    title: 'Relatórios e Analytics',
    desc: 'Analise performance do seu escritório com dashboards customizáveis e métricas de negócio em tempo real.',
    details: ['Dashboards interativos', 'Relatórios customizáveis', 'Análise de tendências', 'Exportação de dados']
  },
  {
    icon: '🔐',
    title: 'Segurança e Conformidade',
    desc: 'Seus dados protegidos com criptografia, backup automático e conformidade com LGPD e segurança jurídica.',
    details: ['Criptografia end-to-end', 'Backup automático', 'Conformidade LGPD', 'Auditoria de acessos']
  }
];

const howItWorks = [
  {
    number: '1',
    title: 'Cadastre Seus Clientes',
    desc: 'Organize clientes (PF e PJ) com documentos, contatos e histórico centralizado.'
  },
  {
    number: '2',
    title: 'Registre Processos e Serviços',
    desc: 'Crie processos judiciais ou registre serviços com prazos e acompanhamento automático.'
  },
  {
    number: '3',
    title: 'Fature e Monitore Pagamentos',
    desc: 'Gere invoices automáticas e rastreie pagamentos com lembretes integrados.'
  },
  {
    number: '4',
    title: 'Acompanhe com Relatórios',
    desc: 'Visualize performance, rentabilidade e análises em dashboards dinâmicos.'
  }
];

const pricingTiers = [
  {
    name: 'Starter',
    price: 'R$ 99',
    period: '/mês',
    description: 'Para pequenos escritórios',
    features: [
      'Até 50 clientes',
      'Até 100 processos',
      'Dashboard básico',
      'Suporte por email',
      'Backup diário'
    ],
    cta: 'Começar Agora'
  },
  {
    name: 'Professional',
    price: 'R$ 249',
    period: '/mês',
    description: 'Para médios escritórios',
    features: [
      'Até 500 clientes',
      'Até 1000 processos',
      'Dashboards avançados',
      'Suporte prioritário',
      'Relatórios customizados',
      'API acesso'
    ],
    cta: 'Começar Agora',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Para grandes operações',
    features: [
      'Clientes ilimitados',
      'Processos ilimitados',
      'Integrações personalizadas',
      'Suporte dedicado 24/7',
      'Treinamento incluído',
      'SLA garantido'
    ],
    cta: 'Conversar com Vendas'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-blue-100 mb-6">Soluções completas para gerenciar sua prática jurídica e contábil com eficiência</p>
          <div className="flex gap-2 text-sm">
            <Link to={createPageUrl('Home')} className="hover:underline">Início</Link>
            <span>/</span>
            <span>Serviços</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm md:text-base">Funcionalidades Principais</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Tudo que você precisa para gerenciar seu escritório</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">Plataforma integrada com todas as ferramentas essenciais para advocacia, contabilidade e gestão financeira.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm md:text-base mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm md:text-base">Começando</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">4 passos simples para começar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-6 h-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                )}
                <div className="bg-white p-6 rounded-lg text-center border border-gray-200">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm md:text-base">Planos e Preços</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Escolha o plano ideal para seu escritório</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">Sem contratos de longo prazo. Cancele a qualquer momento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className={`rounded-lg border transition-all ${
                tier.highlighted 
                  ? 'border-blue-600 shadow-xl scale-105 md:scale-100 md:ring-2 md:ring-blue-300' 
                  : 'border-gray-200 hover:border-gray-300'
              } p-8 bg-white`}>
                {tier.highlighted && (
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-gray-600 text-sm">{tier.period}</span>
                </div>
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors mb-6 ${
                  tier.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-slate-900 hover:bg-gray-200'
                }`}>
                  {tier.cta}
                </button>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Integrações Disponíveis</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">Contaux se integra com as principais ferramentas que você já usa.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {['Google Sheets', 'Google Drive', 'Gmail', 'Banco de Dados', 'Stripe', 'Zapier', 'WhatsApp', 'E-mail'].map((int, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg text-center border border-gray-200 hover:border-blue-300 transition-colors">
                <p className="font-semibold text-gray-700">{int}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Transforme a gestão do seu escritório hoje</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-sm md:text-base">Junte-se a centenas de profissionais que já aumentaram sua produtividade com Contaux.</p>
          <Link 
            to={createPageUrl('Home')} 
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Comece Grátis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}