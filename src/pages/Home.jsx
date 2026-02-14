import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Building2, FileText, BarChart3 } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: () => base44.entities.Client.list(),
    enabled: user?.role === 'admin',
  });

  const isAccountant = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-slate-900">Contaux</h1>
          <p className="text-slate-600 mt-2">Professional Double-Entry Bookkeeping</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {isAccountant ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Welcome, {user?.full_name}</h2>
              <p className="text-slate-600 mb-8">Manage your clients and their accounting records.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Total Clients</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{clients?.length || 0}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Manage Clients</p>
                    <p className="text-slate-700 text-sm mt-2">View and manage all client accounts</p>
                  </div>
                  <FileText className="h-6 w-6 text-slate-400" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Reports</p>
                    <p className="text-slate-700 text-sm mt-2">Generate financial statements</p>
                  </div>
                  <BarChart3 className="h-6 w-6 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link to={createPageUrl('Clients')}>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Building2 className="h-4 w-4" />
                  Manage Clients
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Welcome, {user?.full_name}</h2>
            <p className="text-slate-600 mb-8">Contact your accountant to access your financial information.</p>
          </div>
        )}
      </div>
    </div>
  );
}