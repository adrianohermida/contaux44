import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Eye, Search, Plus, Filter } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

export default function BlogList({ onEdit, onRefresh, categories = [] }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadBlogs();
  }, [statusFilter]);

  useEffect(() => {
    onRefresh?.(() => loadBlogs());
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const query = statusFilter === 'all' ? {} : { status: statusFilter };
      const data = await base44.entities.BlogPost.filter(query);
      setBlogs(data);
    } catch (error) {
      console.error('Erro ao carregar blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (confirm('Tem certeza que deseja deletar este blog?')) {
      try {
        await base44.entities.BlogPost.delete(id);
        loadBlogs();
      } catch (error) {
        alert('Erro ao deletar blog');
      }
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusMap = {
      draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Rascunho' },
      review: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Revisão' },
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Agendado' },
      published: { bg: 'bg-green-100', text: 'text-green-700', label: 'Publicado' }
    };
    const style = statusMap[status] || statusMap.draft;
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>;
  };

  if (loading) {
    return <div className="text-center py-8 text-slate-500">Carregando blogs...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Header & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título ou slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm"
          >
            <option value="all">Todos</option>
            <option value="draft">Rascunho</option>
            <option value="review">Revisão</option>
            <option value="scheduled">Agendado</option>
            <option value="published">Publicado</option>
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          Nenhum blog encontrado
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Título</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Views</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">SEO Score</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBlogs.map(blog => (
                <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{blog.title}</p>
                      <p className="text-xs text-slate-500">/{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(blog.status)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{blog.views || 0}</td>
                  <td className="px-6 py-4">
                    {blog.seo_score ? (
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">{blog.seo_score}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(blog)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}