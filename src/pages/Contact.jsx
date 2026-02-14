import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contato</h1>
          <p className="text-slate-600 max-w-2xl">
            Entre em contato conosco para mais informações sobre nossos serviços.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <Phone className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Telefone</h3>
                  <p className="text-slate-600">+55 51 3021-8206</p>
                  <p className="text-slate-600 text-sm mt-2">Aberto das 9 às 17h, seg. à sexta, horário de Brasília.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <a href="mailto:contato@contaux.com" className="text-blue-600 hover:underline">
                    contato@contaux.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Endereço</h3>
                  <p className="text-slate-600">Porto Alegre, RS - Brasil</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Nome</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Assunto</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Assunto da mensagem"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Mensagem</label>
                <textarea 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-32"
                  placeholder="Sua mensagem aqui..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}