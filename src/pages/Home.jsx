import React from 'react';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import NewsCard from '../components/NewsCard';
import FaqItem from '../components/FaqItem';
import { Calculator, FileText, Ticket, BarChart3, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Home() {
  const services = [
    {
      icon: Calculator,
      title: 'Cálculos Judiciais',
      description: 'Garanta cálculos precisos e alinhados às normas dos Tribunais para atender às exigências processuais.'
    },
    {
      icon: FileText,
      title: 'Parecer técnico e perícia contábil',
      description: 'Oferecemos suporte técnico especializado para análise financeira e perícia contábil em processos judiciais.'
    },
    {
      icon: Ticket,
      title: 'Emissão de Guias de Custas',
      description: 'Simplifique o preenchimento e a emissão de guias judiciais com nosso serviço especializado.'
    },
    {
      icon: BarChart3,
      title: 'Planos de Pagamento e de Recuperação Judicial',
      description: 'Consultoria estratégica para criação de planos de pagamento e recuperação judicial.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. João Silva',
      company: 'Azevedo Advocacia',
      location: 'Recife (PE)',
      text: 'Antes de conhecer a Contaux, eu perdia muito tempo tentando organizar as despesas contábeis dos processos. Agora, tudo é mais simples.'
    },
    {
      name: 'Dra. Camila Mendes',
      company: 'Advogada',
      location: 'São Paulo (SP)',
      text: 'Como advogada autônoma, eu sempre precisei cuidar de tudo sozinha. A Contaux mudou isso! Hoje, consigo gerenciar meus processos com mais facilidade.'
    },
    {
      name: 'Dr. Ricardo Almeida',
      company: 'Almeida & Associados',
      location: 'Porto Alegre (RS)',
      text: 'Trabalhar com a Contaux foi uma das melhores decisões para o nosso escritório. Eles são ágeis, organizados e sempre disponíveis.'
    }
  ];

  const news = [
    {
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/533400192_blog-1.jpg',
      title: 'A importância das certidões negativas para sua regularidade jurídica.',
      link: '#'
    },
    {
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/173396dc9_blog-2.jpg',
      title: 'Obtenha certidões negativas com rapidez e segurança com a Contaux.',
      link: '#'
    },
    {
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/8bbde3a94_blog-3.jpg',
      title: 'Certidões negativas: o que são e como obtê-las de forma simples?',
      link: '#'
    }
  ];

  const faqs = [
    {
      question: 'Como a Contaux garante a segurança da correta emissão das guias judiciais?',
      answer: 'Temos 11 anos de experiência em contabilidade pública e prática diária em todos os sistemas de custas dos Tribunais de todas as regiões do Brasil.'
    },
    {
      question: 'A Contaux possui contadores qualificados e experientes?',
      answer: 'Sim, na Contaux, além de contadores qualificados, e por coincidência, todos também são advogados com prática em governança e contabilidade pública.'
    },
    {
      question: 'Como é feito o atendimento aos clientes da Contaux?',
      answer: 'Oferecemos suporte por chat, e-mail, telefone, videoconferência e WhatsApp para ajudar em qualquer dúvida ou questão contábil.'
    },
    {
      question: 'Como a Contaux faz o controle de prazos de recolhimento de custas?',
      answer: 'Utilizamos sistema de tickets com prazos de entrega e também nos adaptamos a softwares jurídicos ou CRMs adotados por nossos clientes.'
    }
  ];

  return (
    <>
      {/* Hero */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Contabilidade Especializada para Advogados e Escritórios de Advocacia
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Serviços de cálculo, emissão de guias, pareceres e planos de pagamento.
            </p>
            <a href="https://contauxcontadoria.freshdesk.com/support/signup" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
              Crie sua conta grátis
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <p className="text-blue-600 font-semibold">Expertise</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Serviços Especializados.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img 
              src="/assets/images/hero/about-img.webp" 
              alt="Sobre Contaux" 
              className="rounded-lg"
            />
            
            <div>
              <p className="text-blue-600 font-semibold mb-2">O que fazemos</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Simplificamos a Contadoria dos seus Processos
              </h2>
              <p className="text-slate-600 mb-6">
                Conheça nossos serviços especializados e diferenciais que fazem da Contaux Contadoria a escolha ideal de contadoria em serviços de processos judiciais.
              </p>
              
              {/* Tabs content */}
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">Personalizado</h3>
                  <p className="text-slate-600 text-sm">
                    Na Contaux, nossos clientes têm acesso a um atendimento personalizado e de qualidade, com profissionais capacitados e experientes em contabilidade do setor jurídico.
                  </p>
                </div>
                <div className="border-l-4 border-slate-200 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">Moderno</h3>
                  <p className="text-slate-600 text-sm">
                    Garantindo eficiência, segurança e conformidade nos padrões de cálculos judiciais com dados confiáveis.
                  </p>
                </div>
                <div className="border-l-4 border-slate-200 pl-4">
                  <h3 className="font-bold text-slate-900 mb-2">Acessível</h3>
                  <p className="text-slate-600 text-sm">
                    Oferecemos preços justos e transparentes em nossos serviços, sem taxas ocultas ou surpresas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Perguntas Frequentes</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-blue-600 font-semibold text-center">O que dizem nossos clientes</p>
            <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">Nossos Depoimentos</h2>
            <p className="text-slate-600 text-center">
              Confiança é a base do nosso trabalho, estes são os depoimentos dos nossos clientes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-blue-600 font-semibold">Blog</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Últimas notícias & artigos</h2>
            <p className="text-slate-600">
              Mantenha-se atualizado com as últimas novidades em contabilidade para o setor jurídico.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <NewsCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Boletim Informativo</h3>
              <p className="text-slate-600 mb-6">
                Inscreva-se e receba conteúdo exclusivo sobre contadoria especializada no setor jurídico
              </p>
              <form className="flex gap-2">
                <input 
                  type="email"
                  placeholder="Seu endereço de e-mail"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
                  required
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                  Registre-se
                </button>
              </form>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Quer abrir sua PJ gratuitamente?</h3>
              <p className="text-slate-600 mb-6">Condições exclusivas para conveniados.</p>
              <a href="#" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                Fale com um especialista
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}