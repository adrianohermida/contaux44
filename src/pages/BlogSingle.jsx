import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Eye, Twitter, Facebook, Linkedin, Share2, User, ArrowLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';

export default function BlogSingle() {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    content: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadBlogPost();
  }, []);

  const loadBlogPost = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const blogId = urlParams.get('id');

      if (!blogId) {
        setLoading(false);
        return;
      }

      const blogs = await base44.entities.BlogPost.filter({ id: blogId, status: 'published' });
      
      if (blogs.length > 0) {
        setBlog(blogs[0]);
        
        // Track view
        await base44.functions.invoke('trackBlogView', { blog_post_id: blogId });

        // Load comments
        const blogComments = await base44.entities.BlogComment.filter(
          { blog_post_id: blogId, status: 'approved' },
          '-created_date'
        );
        setComments(blogComments);
      }
    } catch (error) {
      console.error('Erro ao carregar blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!blog?.id) return;

    setSubmitting(true);
    try {
      await base44.functions.invoke('submitBlogComment', {
        blog_post_id: blog.id,
        ...commentForm
      });

      alert('Comentário enviado! Será publicado após moderação.');
      setCommentForm({
        author_name: '',
        author_email: '',
        content: '',
        rating: 5
      });
    } catch (error) {
      alert('Erro ao enviar comentário: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = blog?.title || '';

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Post não encontrado</h2>
          <Link to={createPageUrl('Blog')}>
            <Button variant="outline">Voltar para o Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Image */}
      <section 
        className="bg-cover bg-center text-white py-24 relative"
        style={{
          backgroundImage: blog.featured_image 
            ? `url(${blog.featured_image})` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to={createPageUrl('Blog')} className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          {blog.excerpt && (
            <p className="text-blue-100 mb-6 text-lg">{blog.excerpt}</p>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Post Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600 font-medium">{blog.author}</span>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.publish_date || blog.created_date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {comments.length} Comentários
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {blog.views || 0} Visualizações
                </div>
              </div>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags & Share */}
            <div className="grid sm:grid-cols-2 gap-8 py-8 border-t border-b border-gray-200">
              <div>
                <h5 className="font-bold mb-3 text-slate-900">Tags Relacionadas</h5>
                <div className="flex flex-wrap gap-2">
                  {(blog.tags || []).slice(0, 5).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold mb-3 text-slate-900">Compartilhar</h5>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-900">
                Comentários ({comments.length})
              </h3>
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Seja o primeiro a comentar!</p>
              ) : (
                <div className="space-y-6 mb-8">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h6 className="font-bold text-slate-900">{comment.author_name}</h6>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.created_date).toLocaleDateString('pt-BR')}
                          </span>
                          {comment.rating > 0 && (
                            <span className="text-yellow-500">{'⭐'.repeat(comment.rating)}</span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comment Form */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">Deixe um comentário</h3>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Seu Nome"
                    value={commentForm.author_name}
                    onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="email"
                    placeholder="Seu Email"
                    value={commentForm.author_email}
                    onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">Avaliação</label>
                  <select
                    value={commentForm.rating}
                    onChange={(e) => setCommentForm({ ...commentForm, rating: parseInt(e.target.value) })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
                    <option value="4">⭐⭐⭐⭐ Muito Bom</option>
                    <option value="3">⭐⭐⭐ Bom</option>
                    <option value="2">⭐⭐ Regular</option>
                    <option value="1">⭐ Ruim</option>
                  </select>
                </div>
                <textarea
                  rows="6"
                  placeholder="Seu comentário"
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {submitting ? 'Enviando...' : 'Enviar Comentário'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Inscreva-se na Newsletter</h3>
              <p className="text-gray-600 mb-4 sm:mb-6">Receba conteúdo exclusivo sobre contabilidade e gestão empresarial</p>
              <form className="flex flex-col sm:flex-row gap-2">
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
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
              <h4 className="text-xl sm:text-2xl font-bold mb-3">Precisa de ajuda contábil?</h4>
              <p className="text-gray-600 mb-4">Fale com nossos especialistas</p>
              <Link to={createPageUrl('Contact')}>
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Fale com um especialista
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}