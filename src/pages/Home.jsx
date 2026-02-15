import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Contabilidade Especializada para Advogados e Escritórios de Advocacia</h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8">Serviços de cálculo, emissão de guias, pareceres e planos de pagamento.</p>
            <Link 
              to={createPageUrl('Contact')}
              className="inline-block px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Crie sua conta grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <p className="text-blue-600 font-semibold">Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Serviços Especializados.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                  <line x1="8" x2="16" y1="6" y2="6"></line>
                  <line x1="16" x2="16" y1="14" y2="18"></line>
                  <path d="M16 10h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M8 14h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M8 18h.01"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Cálculos Judiciais</h3>
              <p className="text-slate-600 text-sm">Garanta cálculos precisos e alinhados às normas dos Tribunais para atender às exigências processuais.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Parecer técnico e perícia contábil</h3>
              <p className="text-slate-600 text-sm">Oferecemos suporte técnico especializado para análise financeira e perícia contábil em processos judiciais.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M13 5v2"></path>
                  <path d="M13 17v2"></path>
                  <path d="M13 11v2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Emissão de Guias de Custas</h3>
              <p className="text-slate-600 text-sm">Simplifique o preenchimento e a emissão de guias judiciais com nosso serviço especializado.</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                  <path d="M18 17V9"></path>
                  <path d="M13 17V5"></path>
                  <path d="M8 17v-3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Planos de Pagamento e de Recuperação Judicial</h3>
              <p className="text-slate-600 text-sm">Consultoria estratégica para criação de planos de pagamento e recuperação judicial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-12 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop" alt="Sobre Contaux" className="rounded-lg w-full" />
            <div>
              <p className="text-blue-600 font-semibold mb-2">O que fazemos</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Simplificamos a Contadoria dos seus Processos</h2>
              <p className="text-slate-600 mb-6">Conheça nossos serviços especializados e diferenciais que fazem da Contaux Contadoria a escolha ideal de contadoria em serviços de processos judiciais.</p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">Personalizado</h3>
                  <p className="text-slate-600 text-sm">Na Contaux, nossos clientes têm acesso a um atendimento personalizado e de qualidade, com profissionais capacitados e experientes em contabilidade do setor jurídico.</p>
                </div>
                <div className="border-l-4 border-slate-200 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">Moderno</h3>
                  <p className="text-slate-600 text-sm">Garantindo eficiência, segurança e conformidade nos padrões de cálculos judiciais com dados confiáveis.</p>
                </div>
                <div className="border-l-4 border-slate-200 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">Acessível</h3>
                  <p className="text-slate-600 text-sm">Oferecemos preços justos e transparentes em nossos serviços, sem taxas ocultas ou surpresas.</p>
                </div>
              </div>
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