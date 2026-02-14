import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormFeedback from '../components/contact/FormFeedback';

export default function QuoteRequest() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    plan_type: 'Profissional',
    company_type: 'Simples Nacional',
    description: ''
  });
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await base44.functions.invoke('submitQuoteRequest', formData);
      setFeedback({ 
        type: 'success', 
        message: 'Solicitação recebida! Entraremos em contato em breve.' 
      });
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        plan_type: 'Profissional',
        company_type: 'Simples Nacional',
        description: ''
      });
      setTimeout(() => {
        window.location.href = createPageUrl('Home');
      }, 3000);
    } catch (error) {
      setFeedback({ 
        type: 'error', 
        message: 'Erro ao enviar solicitação. Tente novamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4">
      {/* Breadcrumb */}
      <div className="max-w-2xl mx-auto mb-8">
        <Link to={createPageUrl('Pricing')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Planos
        </Link>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Solicitar Orçamento</h1>
          <p className="text-slate-600 mb-8">
            Preencha o formulário abaixo com suas informações. Nossa equipe analisará sua solicitação e entrará em contato com uma proposta personalizada.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {feedback && (
              <FormFeedback
                type={feedback.type}
                message={feedback.message}
                onClose={() => setFeedback(null)}
              />
            )}

            {/* Empresa */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Nome da Empresa/Escritório *
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                  placeholder="Ex: Silva & Associados"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Tipo de Empresa *
                </label>
                <select
                  name="company_type"
                  value={formData.company_type}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                >
                  <option value="Simples Nacional">Simples Nacional</option>
                  <option value="Contabilidade">Empresa de Contabilidade</option>
                  <option value="Escritório de Advocacia">Escritório de Advocacia</option>
                </select>
              </div>
            </div>

            {/* Contato */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Nome do Contato *
                </label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Telefone e Plano */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Plano de Interesse *
                </label>
                <select
                  name="plan_type"
                  value={formData.plan_type}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                >
                  <option value="Simples">Plano Simples</option>
                  <option value="Profissional">Plano Profissional</option>
                  <option value="Empresarial">Plano Empresarial</option>
                </select>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Descreva suas necessidades e escopo do projeto *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                placeholder="Ex: Precisamos de uma solução para gerenciar 50 processos por mês com integrações customizadas..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
            </button>

            <p className="text-xs text-slate-600 text-center">
              * Campos obrigatórios. Sua privacidade é importante para nós.
            </p>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Próximas Etapas</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Você receberá um email de confirmação do recebimento</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Nossa equipe analisará sua solicitação (24-48 horas)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Você receberá uma proposta detalhada e personalizada</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Marcaremos uma reunião para discutir os próximos passos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}