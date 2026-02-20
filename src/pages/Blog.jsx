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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Breadcrumbs */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-8 sm:py-12 md:py-16">
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

      {/* Search & Filters */}
      <section className="bg-slate-50 dark:bg-slate-800 py-6 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            {/* Search */}
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            {/* Category Filter */}
            <select
              value={selectedCategory || ''}
              onChange={(e) => {
                setSelectedCategory(e.target.value || null);
                setCurrentPage(1);
              }}
              className="px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Todas categorias</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-300">Tags:</span>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(selectedTag === tag ? null : tag);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Posts */}
            <div className="lg:col-span-2">
              {/* Results count */}
              <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {filteredPosts.length === 0 ? (
                  <p>Nenhum resultado encontrado</p>
                ) : (
                  <p>
                    Mostrando {startIdx + 1}-{Math.min(startIdx + postsPerPage, filteredPosts.length)} de {filteredPosts.length} artigos
                  </p>
                )}
              </div>

              {paginatedPosts.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Nenhum post encontrado com os filtros aplicados.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setCurrentPage(1);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-12">
                  {paginatedPosts.map(post => (
                    <Link key={post.id} to={`${createPageUrl('BlogSingle')}?id=${post.id}`}>
                      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 flex gap-4">
                        {post.featured_image && (
                          <img 
                            src={post.featured_image} 
                            alt={post.title} 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover flex-shrink-0 rounded-lg" 
                            loading="lazy" 
                          />
                        )}
                        <div className="p-3 sm:p-4 flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                  {post.author?.charAt(0)?.toUpperCase()}
                                </span>
                              </div>
                              <span className="truncate">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
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
                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded hover:bg-gray-50 dark:hover:bg-slate-600 text-xs sm:text-sm">← Anterior</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded hover:bg-gray-50 dark:hover:bg-slate-600 text-xs sm:text-sm">Próxima →</button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Search */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 sm:p-4 rounded-lg">
                <h5 className="font-bold mb-3 text-sm dark:text-white">Filtros</h5>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchTerm} 
                    onChange={(e) => {
                      setSearchTerm(e.target.value); 
                      setCurrentPage(1);
                    }} 
                    className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs" 
                  />
                  <button className="px-2 py-1 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs sm:text-sm">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                
                {/* Active filters */}
                {(selectedCategory || selectedTag || searchTerm) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded">
                        Busca: "{searchTerm}"
                        <button onClick={() => {setSearchTerm(''); setCurrentPage(1);}} className="hover:font-bold">×</button>
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded">
                        Categoria
                        <button onClick={() => {setSelectedCategory(null); setCurrentPage(1);}} className="hover:font-bold">×</button>
                      </span>
                    )}
                    {selectedTag && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded">
                        {selectedTag}
                        <button onClick={() => {setSelectedTag(null); setCurrentPage(1);}} className="hover:font-bold">×</button>
                      </span>
                    )}
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory(null);
                        setSelectedTag(null);
                        setCurrentPage(1);
                      }}
                      className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 underline"
                    >
                      Limpar
                    </button>
                  </div>
                )}
              </div>

              {/* Popular Posts */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 sm:p-4 rounded-lg">
                <h5 className="font-bold mb-2 text-sm dark:text-white">Posts Populares</h5>
                <div className="space-y-2">
                  {popularPosts.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400">Nenhum post ainda</p>
                  ) : (
                    popularPosts.map(post => (
                      <Link key={post.id} to={`${createPageUrl('BlogSingle')}?id=${post.id}`}>
                        <div className="pb-2 border-b border-gray-200 dark:border-slate-700 last:border-0">
                          <h6 className="font-semibold text-xs hover:text-blue-600 dark:hover:text-blue-400 mb-0.5 line-clamp-2 dark:text-white">
                            {post.title}
                          </h6>
                          <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1">
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
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 sm:p-4 rounded-lg">
                <h5 className="font-bold mb-2 text-sm dark:text-white">Categorias</h5>
                <ul className="space-y-1">
                  {categories.length === 0 ? (
                    <li className="text-xs text-slate-500 dark:text-slate-400">Nenhuma categoria</li>
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
                            className={`w-full text-left text-xs flex justify-between items-center hover:text-blue-700 dark:hover:text-blue-400 ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}
                          >
                            <span className="flex items-center gap-1 flex-1 min-w-0">
                              {cat.icon && <span className="text-sm flex-shrink-0">{cat.icon}</span>}
                              <span className="truncate">{cat.name}</span>
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0 ml-1">({count})</span>
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 sm:p-4 rounded-lg">
                <h5 className="font-bold mb-2 text-sm dark:text-white">Tags Populares</h5>
                <div className="flex flex-wrap gap-1">
                  {tags.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400">Nenhuma tag ainda</p>
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
                          className={`px-2 py-0.5 text-xs rounded transition-colors ${
                            isActive 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white'
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

      {/* Virtual Counter Widget */}
      <VirtualCounterWidget />

    </div>
  );
}