import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { base44 } from '@/api/base44Client';

function NewsletterForm({ source }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await base44.functions.invoke('subscribeNewsletter', { email, source });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {status === 'success' && (
        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm w-full">✓ Inscrição realizada!</div>
      )}
      {status === 'error' && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm w-full">✗ Erro ao inscrever.</div>
      )}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input 
          type="email" 
          placeholder="Seu endereço de e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />
        <button type="submit" className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm whitespace-nowrap">
          Registre-se
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await base44.functions.invoke('submitContactForm', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
       {/* Breadcrumbs */}
       <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-12 md:py-16">
         <div className="max-w-6xl mx-auto px-4">
           <h1 className="text-2xl md:text-4xl font-bold mb-4">Fale Conosco</h1>
           <p className="text-blue-100 text-sm md:text-base mb-6">Dúvidas, sugestões ou reclamações? Deixe seu feedback ou envie sua mensagem.</p>
           <div className="flex gap-2 text-xs md:text-sm flex-wrap">
             <a href="/" className="hover:underline">Início</a>
             <span>/</span>
             <span>Fale Conosco</span>
           </div>
         </div>
       </section>

       {/* Contact Section */}
       <section className="py-12 md:py-20 dark:bg-slate-900">
         <div className="max-w-6xl mx-auto px-4">
           <div className="grid md:grid-cols-5 gap-6 md:gap-12">
             {/* Left - Contact Info */}
             <div className="md:col-span-2">
               <div className="space-y-6 md:space-y-8">
                 {/* Header */}
                 <div>
                   <h4 className="text-xl md:text-2xl font-bold dark:text-white mb-2">Informações de Contato</h4>
                   <p className="text-gray-600 dark:text-slate-400 text-sm md:text-base">
                     Contaux Contabilidade<br />
                     CNPJ: 07.772.334/0001-22
                   </p>
                 </div>

                 {/* Phone */}
                 <div className="flex gap-4">
                   <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                   <div>
                     <h5 className="font-bold dark:text-white text-sm md:text-base mb-1">Telefone</h5>
                     <p className="text-gray-600 dark:text-slate-400 text-sm">+55 51 2391-1854</p>
                   </div>
                 </div>

                 {/* Email */}
                 <div className="flex gap-4">
                   <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                   <div>
                     <h5 className="font-bold dark:text-white text-sm md:text-base mb-1">Email</h5>
                     <a href="mailto:contato@contaux.com.br" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                       contato@contaux.com.br
                     </a>
                   </div>
                 </div>

                 {/* Address */}
                 <div className="flex gap-4">
                   <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                   <div>
                     <h5 className="font-bold dark:text-white text-sm md:text-base mb-1">Endereço</h5>
                     <p className="text-gray-600 dark:text-slate-400 text-sm">
                       Av. Dolores Alcaraz Caldas, 90, 8º Andar<br />
                       Praia de Belas, CEP 90110-180<br />
                       Porto Alegre / RS
                     </p>
                   </div>
                 </div>

                 {/* Social Links */}
                 <div>
                   <h5 className="font-bold dark:text-white text-sm md:text-base mb-4">Siga-nos</h5>
                   <div className="flex gap-4">
                     <a href="https://www.facebook.com/Contaux-Contabilidade" target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                       <Facebook className="w-5 h-5" />
                     </a>
                     <a href="https://twitter.com/Contaux_c" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                       <Twitter className="w-5 h-5" />
                     </a>
                     <a href="https://www.linkedin.com/company/contaux-contabilidade" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                       <Linkedin className="w-5 h-5" />
                     </a>
                     <a href="https://www.instagram.com/contauxcontadoria/" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                       <Instagram className="w-5 h-5" />
                     </a>
                   </div>
                 </div>
               </div>
             </div>

             {/* Right - Contact Form */}
             <div className="md:col-span-3">
               <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                 {submitted && (
                   <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
                     ✓ Mensagem enviada com sucesso!
                   </div>
                 )}

                 <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                   <input
                     type="text"
                     name="name"
                     placeholder="Nome"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                   />
                   <input
                     type="text"
                     name="subject"
                     placeholder="Assunto"
                     value={formData.subject}
                     onChange={handleChange}
                     required
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                   />
                 </div>

                 <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                   <input
                     type="email"
                     name="email"
                     placeholder="Endereço eletrônico"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                   />
                   <input
                     type="tel"
                     name="phone"
                     placeholder="Celular"
                     value={formData.phone}
                     onChange={handleChange}
                     required
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                   />
                 </div>

                 <textarea
                   name="message"
                   placeholder="Escreva sua mensagem"
                   rows="5"
                   value={formData.message}
                   onChange={handleChange}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                 />

                 <button
                   type="submit"
                   className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
                 >
                   Enviar mensagem
                 </button>
               </form>
             </div>
           </div>
         </div>
       </section>

       {/* Newsletter Section */}
       <section className="bg-slate-50 dark:bg-slate-800 py-12 md:py-16">
         <div className="max-w-4xl mx-auto px-4 text-center">
           <h4 className="text-xl md:text-2xl font-bold dark:text-white mb-2">Fique Atualizado</h4>
           <p className="text-gray-600 dark:text-slate-400 text-sm md:text-base mb-6">Receba nossas novidades e atualizações sobre contabilidade, jurídico e gestão empresarial.</p>
           <NewsletterForm source="contact" />
         </div>
       </section>

       {/* CTA Section */}
       <section className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 text-white py-12 md:py-16">
         <div className="max-w-4xl mx-auto px-4 text-center">
           <h4 className="text-xl md:text-2xl font-bold mb-3">Precisa de mais informações?</h4>
           <p className="text-blue-100 mb-6 text-sm md:text-base">Confira nossos serviços ou agende uma consulta gratuita com nossos especialistas.</p>
           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
             <a href="/services" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm">
               Ver Serviços
             </a>
             <a href="/quote-request" className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm">
               Solicitar Proposta
             </a>
           </div>
         </div>
       </section>
    </div>
  );
}