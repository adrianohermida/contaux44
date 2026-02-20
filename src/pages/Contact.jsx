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
        <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm w-full">✓ Inscrição realizada!</div>
      )}
      {status === 'error' && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm w-full">✗ Erro ao inscrever.</div>
      )}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input 
          type="email" 
          placeholder="Seu endereço de e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
        />
        <button type="submit" className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
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
                   <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                   <div>
                     <h5 className="font-bold text-sm md:text-base mb-1">Telefone</h5>
                     <p className="text-gray-600 text-sm">+55 51 2391-1854</p>
                   </div>
                 </div>

                 {/* Email */}
                 <div className="flex gap-4">
                   <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                   <div>
                     <h5 className="font-bold text-sm md:text-base mb-1">Email</h5>
                     <a href="mailto:contato@contaux.com.br" className="text-blue-600 hover:underline text-sm">
                       contato@contaux.com.br
                     </a>
                   </div>
                 </div>

                 {/* Address */}
                 <div className="flex gap-4">
                   <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                   <div>
                     <h5 className="font-bold text-sm md:text-base mb-1">Endereço</h5>
                     <p className="text-gray-600 text-sm">
                       Av. Dolores Alcaraz Caldas, 90, 8º Andar<br />
                       Praia de Belas, CEP 90110-180<br />
                       Porto Alegre / RS
                     </p>
                   </div>
                 </div>

                 {/* Social Links */}
                 <div>
                   <h5 className="font-bold text-sm md:text-base mb-4">Siga-nos</h5>
                   <div className="flex gap-4">
                     <a href="https://www.facebook.com/Contaux-Contabilidade" target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                       <Facebook className="w-5 h-5" />
                     </a>
                     <a href="https://twitter.com/Contaux_c" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                       <Twitter className="w-5 h-5" />
                     </a>
                     <a href="https://www.linkedin.com/company/contaux-contabilidade" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                       <Linkedin className="w-5 h-5" />
                     </a>
                     <a href="https://www.instagram.com/contauxcontadoria/" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
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
                   <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
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
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                   />
                   <input
                     type="text"
                     name="subject"
                     placeholder="Assunto"
                     value={formData.subject}
                     onChange={handleChange}
                     required
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
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
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                   />
                   <input
                     type="tel"
                     name="phone"
                     placeholder="Celular"
                     value={formData.phone}
                     onChange={handleChange}
                     required
                     className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                   />
                 </div>

                 <textarea
                   name="message"
                   placeholder="Escreva sua mensagem"
                   rows="5"
                   value={formData.message}
                   onChange={handleChange}
                   className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                 />

                 <button
                   type="submit"
                   className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                 >
                   Enviar mensagem
                 </button>
               </form>
             </div>
           </div>
         </div>
       </section>

       {/* Google Maps */}
       <section className="py-12 bg-gray-50">
         <div className="max-w-6xl mx-auto px-4">
           <iframe
             width="100%"
             height="300"
             frameBorder="0"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.558101516756!2d-51.2296031236943!3d-30.049533074921044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979b632a699cb%3A0xf4a87340534ec234!2sContaux%20Contabilidade%20Online!5e0!3m2!1spt-BR!2sbr!4v1715962160718!5m2!1spt-BR!2sbr"
             allowFullScreen=""
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
             className="rounded-lg w-full md:h-96"
           />
         </div>
       </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-50">
       <div className="max-w-6xl mx-auto px-4">
         <div className="grid md:grid-cols-2 gap-6 md:gap-12">
           <div>
             <h3 className="text-xl md:text-2xl font-bold mb-4">Boletim Informativo</h3>
             <p className="text-gray-600 text-sm md:text-base mb-6">Inscreva-se e receba conteúdo exclusivo sobre contabilidade especializada</p>
             <NewsletterForm source="contact" />
           </div>

            <div className="bg-white p-4 md:p-8 rounded-lg border border-gray-200">
              <h4 className="text-xl md:text-2xl font-bold mb-3">Quer abrir sua PJ gratuitamente?</h4>
              <p className="text-gray-600 text-sm md:text-base mb-6">Disponível em qualquer plano anual.</p>
              <button className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Fale com um especialista
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}