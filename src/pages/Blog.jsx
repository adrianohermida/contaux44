import React, { useState } from 'react';
import { Search, Calendar, MessageCircle, Eye } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const blogPosts = [
  { id: 1, title: 'Make your team a Design driven company', author: 'Tim Norton', date: '05th Nov 2023', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.' },
  { id: 2, title: 'The newest web framework that changed the world', author: 'Tim Norton', date: '24th March 2023', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.' },
  { id: 3, title: '5 ways to improve user retention for your startup', author: 'Tim Norton', date: '30th Jan 2023', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.' },
  { id: 4, title: 'Make your team a Design driven company', author: 'Tim Norton', date: '15th Dec 2022', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.' },
  { id: 5, title: 'The newest web framework that changed the world', author: 'Tim Norton', date: '10th Nov 2022', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.' },
  { id: 6, title: '5 ways to improve user retention for your startup', author: 'Tim Norton', date: '05th Oct 2022', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.' },
];

const popularPosts = [
  { id: 1, title: '8 simple ways to utilize a blog to improve SEO results', date: '05th Nov 2023' },
  { id: 2, title: '7 most important SEO focus areas for colleges and universities', date: '24th March 2023' },
  { id: 3, title: 'How to drive conversions with on-brand SEO copywriting', date: '30th Jan 2023' },
];

const categories = [
  { name: 'Business', count: 26 },
  { name: 'Consultant', count: 30 },
  { name: 'Creative', count: 71 },
  { name: 'UI/UX', count: 56 },
  { name: 'Technology', count: 60 },
];

const tags = ['Popular Template', 'Design', 'UX', 'Icon', 'Usability', 'Tech', 'Mouse', 'Kit', 'Consult', 'Business', 'Keyboard', 'Develop'];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const postsPerPage = 6;

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await base44.functions.invoke('subscribeNewsletter', {
        email: newsletterEmail,
        source: 'blog'
      });
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog Grid Sidebar</h1>
          <p className="text-blue-100 mb-6">Business plan draws on a wide range of knowledge from different business disciplines.</p>
          <div className="flex gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <span>Blog</span>
            <span>/</span>
            <span>Blog List</span>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Posts */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {paginatedPosts.map(post => (
                  <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={post.id === 1 || post.id === 4 ? 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/533400192_blog-1.jpg' : post.id === 2 || post.id === 5 ? 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/173396dc9_blog-2.jpg' : 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/8bbde3a94_blog-3.jpg'} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-2 hover:text-blue-600 cursor-pointer"><a href="#">{post.title}</a></h4>
                      <p className="text-gray-600 text-sm mb-4">{post.desc}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <img src={`https://i.pravatar.cc/30?img=${post.id}`} alt={post.author} className="w-6 h-6 rounded-full" />
                        <span>BY {post.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mb-8">
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">Next →</button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h5 className="font-bold mb-4">Search Objects</h5>
                <div className="flex gap-2">
                  <input type="text" placeholder="Search Here..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
                  <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"><Search className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h5 className="font-bold mb-4">Popular Feeds</h5>
                <div className="space-y-4">
                  {popularPosts.map(post => (
                    <div key={post.id} className="pb-4 border-b border-gray-200 last:border-0">
                      <h6 className="font-semibold text-sm hover:text-blue-600 cursor-pointer mb-1"><a href="#">{post.title}</a></h6>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h5 className="font-bold mb-4">Categories</h5>
                <ul className="space-y-2">
                  {categories.map((cat, idx) => (
                    <li key={idx}><a href="#" className="text-blue-600 hover:underline text-sm flex justify-between"><span>{cat.name}</span> <span className="text-gray-400">{cat.count}</span></a></li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h5 className="font-bold mb-4">Popular Tags</h5>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <a key={idx} href="#" className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-blue-600 hover:text-white transition-colors">{tag}</a>
                  ))}
                </div>
              </div>
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
                   <p className="text-gray-600 mb-6">Registre-se e receba conteúdo exclusivo sobre contabilidade de empresas</p>
                   {newsletterStatus === 'success' && (
                     <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">✓ Inscrição realizada com sucesso!</div>
                   )}
                   {newsletterStatus === 'error' && (
                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">✗ Erro ao inscrever. Tente novamente.</div>
                   )}
                   <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                     <input 
                       type="email" 
                       placeholder="Seu endereço de e-mail" 
                       value={newsletterEmail}
                       onChange={(e) => setNewsletterEmail(e.target.value)}
                       required
                       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                     />
                     <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Registre-se</button>
                   </form>
                 </div>
                 <div className="bg-white p-8 rounded-lg border border-gray-200">
                   <h4 className="text-2xl font-bold mb-3">Quer abrir sua empresa grátis?</h4>
                   <p className="text-gray-600 mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                   <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Fale com um especialista</button>
                 </div>
               </div>
             </div>
           </section>
    </div>
  );
}