import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import VirtualCounterWidget from '../components/dashboard/widgets/VirtualCounterWidget';

const services = [
  {
    icon: '⚖️',
    title: 'Contabilidade Judicial',
    desc: 'Cálculos especializados de custas processuais, honorários e gestão de planos de pagamento para processos judiciais.',
    details: ['Cálculo de custas judiciais', 'Planos de pagamento', 'Compensação de custas', 'Análise de honorários']
  },
  {
    icon: '📋',
    title: 'Pareceres Técnicos',
    desc: 'Emissão de pareceres contábeis e técnicos para subsidiar decisões jurídicas e assessoria de escritórios.',
    details: ['Parecer contábil', 'Parecer técnico', 'Laudo financeiro', 'Avaliação patrimonial']
  },
  {
    icon: '💼',
    title: 'Cálculos Trabalhistas',
    desc: 'Cálculos especializados de diferenças salariais, horas extras, indenizações e contribuições rescisórias.',
    details: ['Cálculo de diferenças salariais', 'Horas extras e adicionais', 'Indenizações trabalhistas', 'FGTS e verbas rescisórias']
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Pensão Alimentícia',
    desc: 'Cálculos de pensão alimentícia, revisão de alimentos e análise de capacidade contributiva.',
    details: ['Cálculo inicial de alimentos', 'Revisão de pensão', 'Capacidade contributiva', 'Planilhas de evolução']
  },
  {
    icon: '🏦',
    title: 'Revisão Bancária',
    desc: 'Análise e revisão de operações bancárias, juros abusivos e cálculos de restituição.',
    details: ['Análise de juros', 'Revisão de operações', 'Cálculo de restituição', 'Parecer técnico bancário']
  },
  {
    icon: '💳',
    title: 'Superendividamento',
    desc: 'Análise de situação de endividamento, cálculos de renegociação e estudos de viabilidade financeira.',
    details: ['Análise de endividamento', 'Plano de renegociação', 'Viabilidade financeira', 'Parecer sobre alívio de dívidas']
  },
  {
    icon: '📄',
    title: 'Guias de Recolhimento',
    desc: 'Geração automatizada de guias de recolhimento (DARF, GPS, FGTS) e documentação fiscal.',
    details: ['Geração DARF', 'GPS e contribuições', 'Recolhimento FGTS', 'Comprovantes de recolhimento']
  },
  {
    icon: '🔐',
    title: 'Segurança e Conformidade',
    desc: 'Seus dados protegidos com criptografia, backup automático e conformidade com LGPD e legislação jurídica.',
    details: ['Criptografia end-to-end', 'Backup automático', 'Conformidade LGPD', 'Auditoria de acessos']
  }
];

const howItWorks = [
  {
    number: '1',
    title: 'Envie a Documentação',
    desc: 'Forneça todos os documentos do processo: sentença, decisão, contrato ou acordo para análise.'
  },
  {
    number: '2',
    title: 'Análise Especializada',
    desc: 'Nossa equipe analisa a documentação e realiza cálculos conforme a legislação aplicável.'
  },
  {
    number: '3',
    title: 'Emissão de Parecer',
    desc: 'Receba parecer técnico, cálculos detalhados e guias de recolhimento prontos para uso.'
  },
  {
    number: '4',
    title: 'Suporte Continuado',
    desc: 'Disponível para esclarecimentos e ajustes conforme necessário para seu caso.'
  }
];

const pricingTiers = [
  {
    name: 'Serviço Básico',
    price: 'Sob Consulta',
    period: 'por demanda',
    description: 'Para cálculos pontuais',
    features: [
      'Cálculos simples',
      'Parecer técnico',
      'Guia de recolhimento',
      'Resposta em 48h',
      'Email de contato'
    ],
    cta: 'Solicitar Orçamento'
  },
  {
    name: 'Contrato Mensal',
    price: 'Sob Consulta',
    period: '/mês',
    description: 'Para demanda contínua',
    features: [
      'Cálculos ilimitados',
      'Pareceres técnicos',
      'Atendimento prioritário',
      'Consultoria jurídica-contábil',
      'Relatórios mensais',
      'Suporte por telefone'
    ],
    cta: 'Falar com Consultor',
    highlighted: true
  },
  {
    name: 'Parceria Estratégica',
    price: 'Custom',
    period: '',
    description: 'Para associações duradouras',
    features: [
      'Atendimento exclusivo',
      'Integração com seu sistema',
      'Parecerias especiais',
      'Suporte 24/7 dedicado',
      'Treinamento da equipe',
      'SLA garantido'
    ],
    cta: 'Negociar Parceria'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-blue-100 text-lg mb-6">Especialidades em contabilidade judicial para escritórios de advocacia e empresas</p>
          <div className="flex gap-2 text-sm">
            <Link to={createPageUrl('Home')} className="hover:underline">Início</Link>
            <span>/</span>
            <span>Serviços</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Especialidades Contaux</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Somos especializados em todos os aspectos da contabilidade judicial e cálculos complexos para processos judiciais.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Processo de Atendimento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Modelos de Contratação</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Escolha o modelo que melhor se adequa às necessidades do seu escritório.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`rounded-lg transition-all ${
                  tier.highlighted 
                    ? 'bg-blue-600 text-white shadow-xl scale-105' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-sm mb-4 ${tier.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                    {tier.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className={`text-3xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {tier.price}
                    </div>
                    {tier.period && (
                      <div className={`text-sm ${tier.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                        {tier.period}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-blue-200' : 'text-green-500'}`} />
                        <span className={`text-sm ${tier.highlighted ? 'text-blue-50' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      tier.highlighted
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-gray-700 mb-4">
              Todos os valores são indicativos. Solicite um orçamento personalizado conforme a complexidade do seu caso.
            </p>
            <Link 
              to={createPageUrl('Contact')}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </section>

      {/* Virtual Counter Widget */}
      <VirtualCounterWidget />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Precisa de Assessoria Especializada?</h2>
          <p className="text-blue-100 text-lg mb-8">Entre em contato conosco e conheça como podemos ajudar seu escritório.</p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  );
}