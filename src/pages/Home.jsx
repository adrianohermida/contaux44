import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, CheckCircle2, Scale, DollarSign, Users, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex items-center pt-20 pb-12 sm:pt-0 sm:pb-0 px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop"
                alt="Contabilidade Profissional"
                className="rounded-lg w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Contaux</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8">Contabilidade Especializada para sua Empresa</p>
              <p className="text-base sm:text-lg text-blue-200 mb-8">Serviços contábeis, consultoria fiscal e gestão jurídica com expertise de mais de 20 anos. Ajudamos empresas a crescer com segurança e conformidade.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  to={createPageUrl('Contact')}
                  className="inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  Fale Conosco <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link 
                  to={createPageUrl('About')}
                  className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  Sobre Nós
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">Soluções contábeis e jurídicas customizadas para o sucesso do seu negócio</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <DollarSign className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Contabilidade Fiscal</h3>
              <p className="text-sm sm:text-base text-slate-600">Gestão fiscal completa, apuração de impostos e obrigações acessórias</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Scale className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Consultoria Jurídica</h3>
              <p className="text-sm sm:text-base text-slate-600">Análise de processos legais, contratos e conformidade regulatória</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Consultoria Empresarial</h3>
              <p className="text-sm sm:text-base text-slate-600">Planejamento estratégico, análise financeira e gestão de riscos</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle2 className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Constituição de Empresas</h3>
              <p className="text-sm sm:text-base text-slate-600">Registro, legalização e setup completo de novos negócios</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Calendário Fiscal</h3>
              <p className="text-sm sm:text-base text-slate-600">Planejamento de prazos, impostos e obrigações ao longo do ano</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <DollarSign className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Auditoria e Perícia</h3>
              <p className="text-sm sm:text-base text-slate-600">Auditoria contábil, perícia judicial e análise de regularidade</p>
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
              <p className="text-base sm:text-lg text-blue-100">Empresas Atendidas</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">20+</p>
              <p className="text-base sm:text-lg text-blue-100">Anos de Experiência</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">100%</p>
              <p className="text-base sm:text-lg text-blue-100">Compliance Garantido</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Transforme sua Gestão Contábil</h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8">Entre em contato com nossos especialistas e descubra como podemos ajudar sua empresa</p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Agendar Consulta <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}