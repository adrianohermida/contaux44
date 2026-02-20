import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Eye, Twitter, Facebook, Linkedin, Share2, User, ArrowLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import RelatedPosts from '../components/blog/RelatedPosts';
import TableOfContents from '../components/blog/TableOfContents';
import ReadingTime from '../components/blog/ReadingTime';
import BlogReactions from '../components/blog/BlogReactions';
import BookmarkButton from '../components/blog/BookmarkButton';
import ShareButtons from '../components/blog/ShareButtons';

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
    addSchemaOrg();
  }, []);

  const addSchemaOrg = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    if (!blogId) return;

    try {
      const response = await base44.functions.invoke('generateSchemaOrg', { type: 'blog-post', id: blogId });
      // Remove schema anterior se existir
      const oldSchema = document.querySelector('script[type="application/ld+json"]');
      if (oldSchema) oldSchema.remove();

      // Adiciona novo schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(response.data, null, 2);
      document.head.appendChild(script);
    } catch (error) {
      console.error('Erro ao adicionar Schema.org:', error);
    }
  };

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
    setSubmitting(true);

    try {
      await base44.functions.invoke('submitBlogComment', {
        blog_post_id: blog.id,
        author_name: commentForm.author_name,
        author_email: commentForm.author_email,
        content: commentForm.content,
        rating: commentForm.rating
      });

      setCommentForm({
        author_name: '',
        author_email: '',
        content: '',
        rating: 5
      });

      // Reload comments
      const updatedComments = await base44.entities.BlogComment.filter(
        { blog_post_id: blog.id, status: 'approved' },
        '-created_date'
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Erro ao submeter comentário:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Post não encontrado</h2>
          <Link to={createPageUrl('Blog')}>
            <Button variant="outline">Voltar para o Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-600 dark:text-slate-300 font-medium">{blog.author}</span>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600 dark:text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.publish_date || blog.created_date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <ReadingTime content={blog.content} />
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
              className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Actions Bar */}
            <div className="flex flex-wrap gap-3 py-6 border-t border-gray-200 dark:border-slate-700">
              <BookmarkButton blogPostId={blog.id} />
              <Button variant="outline" onClick={() => window.print()}>
                🖨️ Imprimir
              </Button>
            </div>

            {/* Tags & Share */}
            <div className="grid sm:grid-cols-2 gap-8 py-8 border-t border-b border-gray-200 dark:border-slate-700">
              <div>
                <h5 className="font-bold mb-3 text-slate-900 dark:text-slate-100">Tags Relacionadas</h5>
                <div className="flex flex-wrap gap-2">
                  {(blog.tags || []).slice(0, 5).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm rounded hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <ShareButtons title={blog.title} url={window.location.href} />
              </div>
            </div>

            {/* Reactions */}
            <BlogReactions blogPostId={blog.id} />

            {/* Comments */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Comentários ({comments.length})</h3>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={commentForm.author_name}
                  onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Seu email"
                  value={commentForm.author_email}
                  onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Seu comentário..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Avaliação (0-5 estrelas)
                  </label>
                  <select
                    value={commentForm.rating}
                    onChange={(e) => setCommentForm({ ...commentForm, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 ⭐⭐⭐⭐</option>
                    <option value={3}>3 ⭐⭐⭐</option>
                    <option value={2}>2 ⭐⭐</option>
                    <option value={1}>1 ⭐</option>
                  </select>
                </div>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting ? 'Enviando...' : 'Enviar Comentário'}
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {comment.author_name[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 dark:text-slate-100">{comment.author_name}</h5>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {new Date(comment.created_date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      {comment.rating > 0 && (
                        <div className="flex gap-1">
                          {[...Array(comment.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <TableOfContents content={blog.content} />
              <div className="mt-8">
                <h4 className="font-bold mb-4 text-slate-900 dark:text-slate-100">Posts Relacionados</h4>
                <RelatedPosts categoryId={blog.category_id} currentPostId={blog.id} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}