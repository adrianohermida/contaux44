import React, { useState, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import BlogEditor from '../components/dashboard/blog/BlogEditor';
import BlogList from '../components/dashboard/blog/BlogList';
import AIAssistant from '../components/dashboard/blog/AIAssistant';
import SEOAnalyzer from '../components/dashboard/blog/SEOAnalyzer';

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
      alert('Erro ao salvar blog: ' + error.message);
    }
  };

  const handleContentGenerated = (content) => {
    setEditingBlog(content);
    setView('editor');
  };

  return (
    <ProtectedInternalRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Gerenciador de Blogs</h1>
              <p className="text-slate-600 mt-1">Crie, edite e otimize seus artigos com assistente de IA</p>
            </div>
            {view === 'list' && (
              <Button onClick={handleNewBlog} className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Blog
              </Button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'list'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📋 Lista
            </button>
            <button
              onClick={() => setView('editor')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'editor'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✍️ Editor
            </button>
            <button
              onClick={() => setView('assistant')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'assistant'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900'
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
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold mb-4">
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

          {view === 'assistant' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIAssistant
                onContentGenerated={handleContentGenerated}
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Como Usar</h3>
                <ul className="space-y-3 text-sm text-blue-800">
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
        </div>
      </DashboardLayout>
    </ProtectedInternalRoute>
  );
}