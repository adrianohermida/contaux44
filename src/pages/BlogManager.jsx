import React, { useState, useEffect } from 'react';
import { Plus, ChevronDown, BarChart3, Clock, MessageSquare, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import BlogEditor from '../components/dashboard/blog/BlogEditor';
import BlogList from '../components/dashboard/blog/BlogList';
import AIAssistant from '../components/dashboard/blog/AIAssistant';
import SEOAnalyzer from '../components/dashboard/blog/SEOAnalyzer';
import BlogComments from '../components/dashboard/blog/BlogComments';
import BlogAnalyticsDashboard from '../components/dashboard/blog/BlogAnalyticsDashboard';
import BlogScheduler from '../components/dashboard/blog/BlogScheduler';
import CommentModerator from '../components/dashboard/blog/CommentModerator';

export default function BlogManager() {
  const [view, setView] = useState('list');
  const [editingBlog, setEditingBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await base44.entities.BlogCategory.list();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleNewBlog = () => {
    setEditingBlog(null);
    setView('editor');
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setView('editor');
  };

  const handleSaveBlog = async (data) => {
    try {
      if (editingBlog?.id) {
        await base44.entities.BlogPost.update(editingBlog.id, data);
      } else {
        await base44.entities.BlogPost.create(data);
      }
      setRefreshKey(prev => prev + 1);
      setView('list');
      setEditingBlog(null);
    } catch (error) {
      console.error('Erro ao salvar blog:', error);
    }
  };

  const handleContentGenerated = (content) => {
    setEditingBlog(prev => ({
      ...prev || {},
      content: prev?.content ? prev.content + '\n' + content : content
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciador de Blogs</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Crie, edite, otimize e agende seus artigos com IA</p>
        </div>
        {view === 'list' && (
          <Button onClick={handleNewBlog} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4" />
            Novo Blog
          </Button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-white dark:bg-slate-800 rounded-lg shadow p-1 overflow-x-auto">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            view === 'list'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          📋 Lista
        </button>
        <button
          onClick={() => setView('editor')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            view === 'editor'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          ✍️ Editor
        </button>
        <button
          onClick={() => setView('analytics')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            view === 'analytics'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Analytics
        </button>
        <button
          onClick={() => setView('scheduler')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            view === 'scheduler'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" /> Agendamento
        </button>
        <button
          onClick={() => setView('moderator')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
            view === 'moderator'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Moderação
        </button>
        <button
          onClick={() => setView('assistant')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            view === 'assistant'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          🤖 Assistente IA
        </button>
      </div>

      {/* Content */}
      {view === 'list' && (
        <BlogList
          key={refreshKey}
          onEdit={handleEditBlog}
          categories={categories}
        />
      )}

      {view === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {editingBlog?.id ? '✏️ Editar Blog' : '📝 Novo Blog'}
              </h2>
              <BlogEditor
                blog={editingBlog}
                onSave={handleSaveBlog}
                categories={categories}
              />
            </div>
          </div>

          <div className="space-y-6">
            {editingBlog && (
              <SEOAnalyzer blogData={editingBlog} />
            )}
          </div>
        </div>
      )}

      {view === 'analytics' && editingBlog && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">📊 Analytics - {editingBlog.title}</h2>
          <BlogAnalyticsDashboard blogPostId={editingBlog.id} days={30} />
        </div>
      )}

      {view === 'scheduler' && editingBlog && (
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">⏰ Agendar Publicação</h2>
          <BlogScheduler 
            blogPostId={editingBlog.id}
            currentStatus={editingBlog.status}
            onSchedule={() => setRefreshKey(prev => prev + 1)}
          />
        </div>
      )}

      {view === 'moderator' && editingBlog && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">💬 Moderação de Comentários</h2>
          <CommentModerator 
            blogPostId={editingBlog.id}
            onUpdate={() => setRefreshKey(prev => prev + 1)}
          />
        </div>
      )}

      {view === 'assistant' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIAssistant
            onContentGenerated={handleContentGenerated}
          />

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-4">💡 Como Usar</h3>
            <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-300">
              <li className="flex gap-2">
                <span className="font-bold">1.</span>
                <span>Insira um tema ou tópico que você quer explorar</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span>
                <span>Adicione palavras-chave para melhor otimização SEO</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">3.</span>
                <span>Clique em "Gerar Ideias" para obter 5 sugestões</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">4.</span>
                <span>Selecione uma ideia e gere o conteúdo automático</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">5.</span>
                <span>Revise, otimize e publique seu blog</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {view === 'comments' && (
        <BlogComments />
      )}
    </div>
  );
}