import React from 'react';

const servicesList = [
  { icon: '🔬', title: 'Discover the world, Explore the Product', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { icon: '📋', title: 'Art Direction & Brand Strategy for your company', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { icon: '💻', title: 'Product UX, Design & Development', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { icon: '🔬', title: 'Discover the world, Explore the Product', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { icon: '📋', title: 'Art Direction & Brand Strategy for your company', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { icon: '💻', title: 'Product UX, Design & Development', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Services</h1>
          <p className="text-blue-100 mb-6">Business plan draws on a wide range of knowledge from different business disciplines.</p>
          <div className="flex gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <span>Services</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold">Care Features</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">Provide Awesome Service With Our Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {servicesList.map((service, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-bold text-lg mb-3 hover:text-blue-600 transition-colors">
                  <a href="#">{service.title}</a>
                </h3>
                <p className="text-gray-600">{service.desc}</p>
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
              <h3 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h3>
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

            <div className="bg-white p-8 rounded-lg">
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