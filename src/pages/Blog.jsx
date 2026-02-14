import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';

export default function Blog() {
  const blogPosts = [
    {
      image: 'https://via.placeholder.com/400x300',
      title: 'A importância das certidões negativas para sua regularidade jurídica.',
      link: '#'
    },
    {
      image: 'https://via.placeholder.com/400x300',
      title: 'Obtenha certidões negativas com rapidez e segurança com a Contaux.',
      link: '#'
    },
    {
      image: 'https://via.placeholder.com/400x300',
      title: 'Certidões negativas: o que são e como obtê-las de forma simples?',
      link: '#'
    },
    {
      image: 'https://via.placeholder.com/400x300',
      title: 'Guia completo sobre custas judiciais e como economizar.',
      link: '#'
    },
    {
      image: 'https://via.placeholder.com/400x300',
      title: 'Recuperação judicial: passo a passo para sua empresa.',
      link: '#'
    },
    {
      image: 'https://via.placeholder.com/400x300',
      title: 'Planejamento contábil para escritórios de advocacia.',
      link: '#'
    }
  ];

  return (
    <>
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
          <p className="text-slate-600 max-w-2xl">
            Mantenha-se atualizado com as últimas novidades em contabilidade para o setor jurídico.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <NewsCard key={i} {...post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}