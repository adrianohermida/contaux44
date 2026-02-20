import React, { useState } from 'react';
import { CheckCircle2, Play, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const teamMembers = [
  { name: 'Dr. Ricardo Silva', role: 'Contador Responsável' },
  { name: 'Fernanda Santos', role: 'Especialista em Contabilidade Judicial' },
  { name: 'João Pereira', role: 'Contador Sênior' },
  { name: 'Marina Costa', role: 'Especialista em Custas Judiciais' },
];

const services = [
  { icon: '⚖️', title: 'Contabilidade Judicial', desc: 'Cálculos complexos de custas, honorários e planos de pagamento para processos judiciais' },
  { icon: '📋', title: 'Pareceres Técnicos', desc: 'Emissão de pareceres contábeis e técnicos para assessoria jurídica' },
  { icon: '💼', title: 'Cálculos Especializados', desc: 'Revisão bancária, cálculos trabalhistas, pensão alimentícia e superendividamento' },
  { icon: '📄', title: 'Guias de Recolhimento', desc: 'Geração automatizada de guias de recolhimento e documentação fiscal' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('missao');

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sobre Contaux</h1>
          <p className="text-blue-100 mb-6">Escritório especializado em contabilidade judicial, custas processuais e cálculos especializados para advocacia.</p>
          <div className="flex gap-2 text-sm">
            <Link to={createPageUrl('Home')} className="hover:underline">Início</Link>
            <span>/</span>
            <span>Sobre Nós</span>
          </div>
        </div>
      </section>

      {/* About Section */}
       <section className="py-12 md:py-20">
         <div className="max-w-6xl mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
             {/* Left Content */}
             <div>
               <div className="mb-8">
                 <span className="text-blue-600 font-semibold text-sm md:text-base">O que fazemos</span>
                 <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Tecnologia que organiza seu escritório</h2>
                 <p className="text-gray-600 text-sm md:text-base">Contaux é uma plataforma integrada que combina CRM, gestão financeira e acompanhamento de processos judiciais em um único sistema.</p>
               </div>

              {/* Tabs */}
                  <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                      <div className="flex gap-4 md:gap-8">
                        {['missao', 'visao', 'valores'].map(tab => {
                          const labels = { missao: 'Missão', visao: 'Visão', valores: 'Valores' };
                          return (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`py-4 font-semibold capitalize whitespace-nowrap text-sm md:text-base ${
                                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                              }`}
                            >
                              {labels[tab]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === 'missao' && (
                  <>
                    <p className="text-gray-600">Simplificar a gestão administrativa de escritórios de advocacia e empresas de contabilidade, fornecendo uma plataforma integrada que centraliza clientes, processos judiciais, documentação e finanças em um único sistema intuitivo.</p>
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Reduzir carga administrativa do profissional jurídico</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Aumentar eficiência operacional dos escritórios</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Otimizar gestão financeira e de clientes</span>
                      </li>
                    </ul>
                  </>
                )}
                {activeTab === 'visao' && (
                  <>
                    <p className="text-gray-600">Ser a plataforma líder no Brasil para gestão integral de escritórios jurídicos e contábeis, oferecendo tecnologia inovadora que transforma processos manuais em fluxos automáticos e inteligentes.</p>
                    <p className="text-gray-600 mt-4">Expandir para integração com sistemas de tribunal eletrônico, automações baseadas em IA e análise preditiva de casos e finanças.</p>
                  </>
                )}
                {activeTab === 'valores' && (
                  <>
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Excelência:</strong> Compromisso com qualidade e inovação contínua</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Transparência:</strong> Clareza e honestidade em tudo que fazemos</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Segurança:</strong> Proteção rigorosa de dados e conformidade legal</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Colaboração:</strong> Nossos clientes são parceiros no sucesso</span>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/fc3eb6844_pf-single1.jpg"
                alt="Team working"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-blue-600 font-semibold text-sm md:text-base">Recursos Principais</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Ferramentas Completas para Seu Escritório</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">Contaux integra todas as funcionalidades necessárias para gerenciar clientes, processos e finanças com eficiência.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-blue-600 font-semibold text-sm md:text-base">Conheça Nossa Equipe</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Profissionais Dedicados</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">Uma equipe multidisciplinar com expertise em tecnologia, direito e contabilidade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, idx) => {
              const teamImages = [
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/8da421752_t1.jpg',
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/5e76acbb9_t2.jpg',
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/d3c4c97f8_t3.jpg',
                'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/a90f2c1b4_t4.jpg',
              ];
              return (
                <div key={idx} className="text-center">
                  <img src={teamImages[idx]} alt={member.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h4 className="font-bold text-lg">{member.name}</h4>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Pronto para modernizar seu escritório?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Contaux simplifica a gestão do seu escritório de advocacia ou contabilidade. Comece agora com uma avaliação gratuita.</p>
          <Link to={createPageUrl('Home')} className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Solicitar Demo
          </Link>
        </div>
      </section>
    </div>
  );
}