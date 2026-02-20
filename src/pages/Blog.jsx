import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Calendar, MessageCircle, Eye } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const postsPerPage = 6;

  useEffect(() => {
    // SEO Meta Tags
    document.title = 'Blog Contaux - Conteúdo em Contabilidade e Gestão';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Artigos especializados em contabilidade, jurídico e gestão empresarial. Fique por dentro das novidades do setor.';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Artigos especializados em contabilidade, jurídico e gestão empresarial. Fique por dentro das novidades do setor.';
      document.head.appendChild(meta);
    }
  }, []);

  // Query para posts publicados
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['blog-posts-published'],
    queryFn: () => base44.entities.BlogPost.filter(
      { status: 'published' },
      '-publish_date',
      50
    ),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Query para categorias
  const { data: categories = [] } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => base44.entities.BlogCategory.list(),
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Extrair tags únicas
  const tags = useMemo(() => {
    const allTags = blogPosts.flatMap(p => p.tags || []);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.slice(0, 12);
  }, [blogPosts]);

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

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category_id === selectedCategory;
    
    const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage);

  // Posts mais populares (ordenados por visualizações)
  const popularPosts = [...blogPosts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Blog Contaux</h1>
          <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">Conteúdo especializado em contabilidade, jurídico e gestão empresarial</p>
          <div className="flex gap-2 text-xs sm:text-sm flex-wrap">
            <a href="/" className="hover:underline">Home</a>
            <span>/</span>
            <span>Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Posts */}
            <div className="sm:col-span-2 lg:col-span-2">
              {/* Results count */}
              <div className="mb-6 text-sm text-slate-600">
                {filteredPosts.length === 0 ? (
                  <p>Nenhum resultado encontrado</p>
                ) : (
                  <p>
                    Mostrando {startIdx + 1}-{Math.min(startIdx + postsPerPage, filteredPosts.length)} de {filteredPosts.length} artigos
                  </p>
                )}
              </div>

              {paginatedPosts.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                  <p className="text-slate-600 mb-4">Nenhum post encontrado com os filtros aplicados.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setCurrentPage(1);
                    }}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                  {paginatedPosts.map(post => (
                    <Link key={post.id} to={`${createPageUrl('BlogSingle')}?id=${post.id}`}>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
                        {post.featured_image && (
                          <img 
                            src={post.featured_image} 
                            alt={post.title} 
                            className="w-full h-40 sm:h-48 object-cover" 
                            loading="lazy" 
                          />
                        )}
                        <div className="p-4 sm:p-6">
                          <h4 className="font-bold text-base sm:text-lg mb-2 hover:text-blue-600 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-[10px] font-bold text-blue-600">
                                  {post.author?.charAt(0)?.toUpperCase()}
                                </span>
                              </div>
                              <span>BY {post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-3 h-3" />
                              <span>{post.views || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center gap-1 sm:gap-2 mb-8 flex-wrap">
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded hover:bg-gray-50 text-xs sm:text-sm">← Anterior</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded hover:bg-gray-50 text-xs sm:text-sm">Próxima →</button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-8">
              {/* Search */}
              <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg">
                <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Buscar Artigos</h5>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchTerm} 
                    onChange={(e) => {
                      setSearchTerm(e.target.value); 
                      setCurrentPage(1);
                    }} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm" 
                  />
                  <button className="px-2 sm:px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Active filters */}
                {(selectedCategory || selectedTag || searchTerm) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        Busca: "{searchTerm}"
                        <button onClick={() => {setSearchTerm(''); setCurrentPage(1);}} className="hover:text-blue-900">×</button>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        Categoria
                        <button onClick={() => {setSelectedCategory(null); setCurrentPage(1);}} className="hover:text-blue-900">×</button>
                      </span>
                    )}
                    {selectedTag && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        Tag: {selectedTag}
                        <button onClick={() => {setSelectedTag(null); setCurrentPage(1);}} className="hover:text-blue-900">×</button>
                      </span>
                    )}
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory(null);
                        setSelectedTag(null);
                        setCurrentPage(1);
                      }}
                      className="text-xs text-slate-600 hover:text-slate-900 underline"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>

              {/* Popular Posts */}
              <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg">
                <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Posts Populares</h5>
                <div className="space-y-3 sm:space-y-4">
                  {popularPosts.length === 0 ? (
                    <p className="text-xs text-slate-500">Nenhum post ainda</p>
                  ) : (
                    popularPosts.map(post => (
                      <Link key={post.id} to={`${createPageUrl('BlogSingle')}?id=${post.id}`}>
                        <div className="pb-3 sm:pb-4 border-b border-gray-200 last:border-0">
                          <h6 className="font-semibold text-xs sm:text-sm hover:text-blue-600 mb-1 line-clamp-2">
                            {post.title}
                          </h6>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publish_date || post.created_date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg">
                <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Categorias</h5>
                <ul className="space-y-2">
                  {categories.length === 0 ? (
                    <li className="text-xs text-slate-500">Nenhuma categoria</li>
                  ) : (
                    categories.map((cat) => {
                      const count = blogPosts.filter(p => p.category_id === cat.id).length;
                      const isActive = selectedCategory === cat.id;
                      return (
                        <li key={cat.id}>
                          <button 
                            onClick={() => {
                              setSelectedCategory(isActive ? null : cat.id);
                              setCurrentPage(1);
                            }}
                            className={`w-full text-left text-xs sm:text-sm flex justify-between items-center hover:text-blue-700 ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-700'}`}
                          >
                            <span className="flex items-center gap-2">
                              {cat.icon && <span className="text-base">{cat.icon}</span>}
                              {cat.name}
                            </span>
                            <span className="text-xs text-slate-500">({count})</span>
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>

              {/* Tags */}
              <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg">
                <h5 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Tags Populares</h5>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {tags.length === 0 ? (
                    <p className="text-xs text-slate-500">Nenhuma tag ainda</p>
                  ) : (
                    tags.map((tag, idx) => {
                      const isActive = selectedTag === tag;
                      return (
                        <button 
                          key={idx} 
                          onClick={() => {
                            setSelectedTag(isActive ? null : tag);
                            setCurrentPage(1);
                          }}
                          className={`px-2 sm:px-3 py-1 text-xs rounded transition-colors ${
                            isActive 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
           <section className="py-12 sm:py-20 bg-gray-50">
             <div className="max-w-6xl mx-auto px-4 sm:px-6">
               <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                 <div>
                   <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Inscreva-se na Newsletter</h3>
                   <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Registre-se e receba conteúdo exclusivo sobre contabilidade de empresas</p>
                   {newsletterStatus === 'success' && (
                     <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm">✓ Inscrição realizada com sucesso!</div>
                   )}
                   {newsletterStatus === 'error' && (
                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm">✗ Erro ao inscrever. Tente novamente.</div>
                   )}
                   <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                     <input 
                       type="email" 
                       placeholder="Seu endereço de e-mail" 
                       value={newsletterEmail}
                       onChange={(e) => setNewsletterEmail(e.target.value)}
                       required
                       className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" 
                     />
                     <button type="submit" className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap">Registre-se</button>
                   </form>
                 </div>
                 <div className="bg-white p-4 sm:p-8 rounded-lg border border-gray-200">
                   <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Quer abrir sua empresa grátis?</h4>
                   <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                   <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">Fale com um especialista</button>
                 </div>
               </div>
             </div>
           </section>
    </div>
  );
}