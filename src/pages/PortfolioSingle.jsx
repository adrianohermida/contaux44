import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Share2 } from 'lucide-react';

export default function PortfolioSingle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Portfolio Details</h1>
          <p className="text-blue-100 mb-6">Business plan draws on a wide range of knowledge from different business disciplines.</p>
          <div className="flex gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <span>Portfolio Details</span>
          </div>
        </div>
      </section>

      {/* Portfolio Details Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <span className="text-blue-400 font-semibold">Graphics Design</span>
          <h2 className="text-4xl font-bold mt-2 mb-6">Best Graphics Design in 2023</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-gray-400 text-sm mb-1">Client</p>
              <a href="#" className="text-white hover:text-blue-400 font-semibold">Envato.com</a>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Year</p>
              <p className="text-white font-semibold">2020</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Tags</p>
              <div className="flex gap-2 flex-wrap">
                <a href="#" className="text-white hover:text-blue-400">Brand</a>,
                <a href="#" className="text-white hover:text-blue-400">Modern</a>,
                <a href="#" className="text-white hover:text-blue-400">Design</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-12 items-start">
            <div>
              <h3 className="text-3xl font-bold mb-6">About the project</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">Languages realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words.</p>
              <p className="text-gray-600 leading-relaxed">Languages realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting. would be desirable.</p>
            </div>
            <img src="https://via.placeholder.com/800x530" alt="Project" className="rounded-lg w-full" />
          </div>

          <p className="text-gray-600 mb-12 leading-relaxed">Languages realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting. In compiling the list, we gave additional weight to usage outside Yale.</p>

          {/* Social Share */}
          <div className="py-8 border-t border-gray-200">
            <h5 className="font-bold mb-4">Social Share</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Inscreva-se na Newsletter</h3>
              <p className="text-gray-600 mb-6">Registre-se e receba conteúdo exclusivo</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Seu endereço de e-mail" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Registre-se</button>
              </form>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h4 className="text-2xl font-bold mb-3">Quer abrir sua empresa grátis?</h4>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Fale com um especialista</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}