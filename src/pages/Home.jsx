import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Calculator, FileSearch, Receipt, BarChart3 } from 'lucide-react';
import FloatingChatWidget from '../components/chat/FloatingChatWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
              Contabilidade Especializada para Advogados e Escritórios de Advocacia
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8">
              Serviços de cálculo, emissão de guias, pareceres e planos de pagamento.
            </p>
            <Link 
              to={createPageUrl('Contact')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Criar conta grátis na Contaux"
            >
              Crie sua conta grátis
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-12 sm:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <p className="text-blue-600 dark:text-blue-400 font-semibold">Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Serviços Especializados.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Calculator className="w-10 h-10" aria-hidden="true" />,
                title: 'Cálculos Judiciais',
                desc: 'Garanta cálculos precisos e alinhados às normas dos Tribunais para atender às exigências processuais.'
              },
              {
                icon: <FileSearch className="w-10 h-10" aria-hidden="true" />,
                title: 'Parecer técnico e perícia contábil',
                desc: 'Oferecemos suporte técnico especializado para análise financeira e perícia contábil em processos judiciais.'
              },
              {
                icon: <Receipt className="w-10 h-10" aria-hidden="true" />,
                title: 'Emissão de Guias de Custas',
                desc: 'Simplifique o preenchimento e a emissão de guias judiciais com nosso serviço especializado.'
              },
              {
                icon: <BarChart3 className="w-10 h-10" aria-hidden="true" />,
                title: 'Planos de Pagamento e de Recuperação Judicial',
                desc: 'Consultoria estratégica para criação de planos de pagamento e recuperação judicial.'
              }
            ].map((service) => (
              <article key={service.title} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-blue-100 dark:hover:border-blue-900">
                <div className="mb-4 text-blue-600 dark:text-blue-400">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop" 
              alt="Escritório de contabilidade jurídica Contaux" 
              className="rounded-xl w-full shadow-lg object-cover"
              loading="lazy"
            />
            <div>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">O que fazemos</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Simplificamos a Contadoria dos seus Processos</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">Conheça nossos serviços especializados e diferenciais que fazem da Contaux Contadoria a escolha ideal de contadoria em serviços de processos judiciais.</p>
              <div className="space-y-4">
                {[
                  { label: 'Personalizado', color: 'border-blue-600', desc: 'Na Contaux, nossos clientes têm acesso a um atendimento personalizado e de qualidade, com profissionais capacitados e experientes em contabilidade do setor jurídico.' },
                  { label: 'Moderno', color: 'border-slate-300 dark:border-slate-600', desc: 'Garantindo eficiência, segurança e conformidade nos padrões de cálculos judiciais com dados confiáveis.' },
                  { label: 'Acessível', color: 'border-slate-300 dark:border-slate-600', desc: 'Oferecemos preços justos e transparentes em nossos serviços, sem taxas ocultas ou surpresas.' }
                ].map((item) => (
                  <div key={item.label} className={`border-l-4 ${item.color} pl-4`}>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{item.label}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">Pronto para Começar?</h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8">
            Crie sua conta grátis para solicitar serviços, acompanhar seus pedidos com transparência e facilidade.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Criar conta grátis"
          >
            Criar Conta Grátis <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
}