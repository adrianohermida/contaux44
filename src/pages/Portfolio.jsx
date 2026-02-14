import React, { useState } from 'react';

const portfolioItems = [
  { id: 1, category: 'marketing', title: 'Best Marketing tips & tricks' },
  { id: 2, category: 'marketing', title: 'Unique Marketing tips & tricks' },
  { id: 3, category: 'web', title: 'Best Web Design in 2023' },
  { id: 4, category: 'branding', title: 'Best Branding Solutions' },
  { id: 5, category: 'web', title: 'Best Web Design in 2023' },
  { id: 6, category: 'graphic', title: 'Best Graphic Design in 2023' },
  { id: 7, category: 'graphic', title: 'Best Graphic Design in 2023' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = ['all', 'branding', 'marketing', 'web', 'graphic'];
  
  const filtered = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-blue-100 mb-6">Business plan draws on a wide range of knowledge from different business disciplines.</p>
          <div className="flex gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <span>Portfolio</span>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Content */}
            <div>
              <span className="text-blue-600 font-semibold">Latest Cases</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">Our projects</h2>
              <p className="text-gray-600">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded transition-colors capitalize ${
                    activeFilter === cat
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:border-blue-600'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg bg-gray-900 cursor-pointer"
              >
                <img
                   src={`/assets/images/portfolio-${(item.id % 3) + 1}.jpg`}
                   alt={item.title}
                   className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                 />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-sm font-semibold text-blue-400">{item.category.toUpperCase()}</span>
                    <h4 className="text-lg font-bold mt-2">{item.title}</h4>
                  </div>
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
              <h3 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h3>
              <p className="text-gray-600 mb-6">Registre-se e receba conteúdo exclusivo sobre contabilidade de empresas</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Seu endereço de e-mail" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Registre-se</button>
              </form>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h4 className="text-2xl font-bold mb-3">Quer abrir sua empresa grátis?</h4>
              <p className="text-gray-600 mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Fale com um especialista</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}