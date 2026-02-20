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
                 <span className="text-blue-600 font-semibold text-sm md:text-base">Quem somos</span>
                 <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Especialistas em Contabilidade Judicial</h2>
                 <p className="text-gray-600 text-sm md:text-base">Contaux é um escritório de contabilidade especializado em contabilidade judicial, cálculos de custas processuais, pareceres técnicos e recolhimentos para escritórios de advocacia e empresas.</p>
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
                    <p className="text-gray-600">Fornecer serviços especializados de contabilidade judicial, custas processuais e pareceres técnicos de excelência para escritórios de advocacia e empresas, otimizando custos e garantindo conformidade legal em todos os processos judiciais.</p>
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Calcular custas e honorários judiciais com precisão</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Gerar pareceres técnicos para assessoria jurídica</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Otimizar gestão de recolhimentos e planos de pagamento</span>
                      </li>
                    </ul>
                  </>
                )}
                {activeTab === 'visao' && (
                  <>
                    <p className="text-gray-600">Ser referência nacional em contabilidade judicial, oferecendo soluções inovadoras que combinam expertise contábil com tecnologia avançada para simplificar processos judiciais complexos.</p>
                    <p className="text-gray-600 mt-4">Expandir para integração com sistemas de tribunal eletrônico, automatizações baseadas em IA para cálculos judiciais e análise preditiva de custas processuais.</p>
                  </>
                )}
                {activeTab === 'valores' && (
                  <>
                    <ul className="space-y-3">
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Excelência:</strong> Qualidade e precisão em todos os cálculos</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Confiabilidade:</strong> Respeito absoluto aos prazos e conformidade legal</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Especialização:</strong> Expertise profunda em contabilidade judicial</span>
                      </li>
                      <li className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><strong>Parceria:</strong> Atuamos como extensão do seu escritório</span>
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
            <span className="text-blue-600 font-semibold text-sm md:text-base">Serviços Principais</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4">Especialidades Contaux</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">Somos especializados em contabilidade judicial com soluções integradas para escritórios de advocacia e empresas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
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
            <h2 className="text-2xl md:text-4xl font-bold mt-2">Profissionais Experientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Pronto para Melhorar Seus Processos Judiciais?</h2>
          <p className="text-blue-100 mb-8 text-sm md:text-base">Trabalhe com especialistas em contabilidade judicial e otimize seus custos processuais.</p>
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