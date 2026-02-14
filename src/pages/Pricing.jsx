import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const plans = [
  {
    title: 'Single use',
    price: 10,
    features: ['Up to 5 users', 'Basic support', 'Monthly updates', 'Free cancelation']
  },
  {
    title: 'Multiple use',
    price: 20,
    featured: true,
    features: ['Up to 10 users', 'Basic support', 'Monthly updates', 'Free cancelation']
  },
  {
    title: 'Extended use',
    price: 30,
    features: ['Up to 20 users', 'Basic support', 'Monthly updates', 'Free cancelation']
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Pricing Table</h1>
          <p className="text-blue-100 mb-6">Business plan draws on a wide range of knowledge from different business disciplines.</p>
          <div className="flex gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <span>Pricing</span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">Pricing Table</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">Our Pricing Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`border rounded-lg overflow-hidden transition-all ${
                  plan.featured 
                    ? 'border-blue-600 shadow-lg lg:scale-105' 
                    : 'border-gray-200 shadow'
                }`}
              >
                {/* Head */}
                <div className={`p-8 ${plan.featured ? 'bg-blue-600 text-white' : 'bg-gray-50'}`}>
                  <h4 className={`text-xl font-bold mb-4 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                    {plan.title}
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className={`text-sm ${plan.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                      per month
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8 space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${
                        plan.featured ? 'text-blue-600' : 'text-green-500'
                      }`} />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="p-8 border-t border-gray-200">
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.featured
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}>
                    Start free trial
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Boletim Informativo</h3>
              <p className="text-gray-600 mb-6">Registre-se e receba conteúdo exclusivo sobre contabilidade de empresas</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu endereço de e-mail"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Registre-se
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h4 className="text-2xl font-bold mb-3">Quer abrir sua empresa grátis?</h4>
              <p className="text-gray-600 mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Fale com um especialista
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}