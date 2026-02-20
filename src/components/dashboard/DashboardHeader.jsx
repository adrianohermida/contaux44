import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Bell, User, LogOut, Settings, Loader2, Moon, Sun } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserAndTenantOptimized } from '../hooks/useUserAndTenantOptimized';
import { useDebounce } from '../hooks/useDebounce';
import { useTheme } from '../hooks/useTheme';
import UserPreferences from './UserPreferences';
import Breadcrumbs from './Breadcrumbs';
import SearchBox from './SearchBox';

const DashboardHeader = memo(function DashboardHeader() {
  const { user, tenantId } = useUserAndTenantOptimized();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Lazy-load notifications with React Query
  const { data: notifications = [], isLoading: notificationsLoading } = useQuery({
    queryKey: ['notifications', tenantId, user?.email],
    queryFn: async () => {
      if (!tenantId || !user?.email) return [];
      const notifs = await base44.entities.Notification.filter({
        tenant_id: tenantId,
        user_email: user.email
      });
      return notifs.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)).slice(0, 5);
    },
    enabled: !!tenantId && !!user?.email,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000,
  });

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.is_read).length,
    [notifications]
  );

  const handleLogout = useCallback(async () => {
    await base44.auth.logout();
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 transition-colors">
        <div className="px-6 py-4 flex items-center justify-between">
        {/* Search */}
        <SearchBox query={searchQuery} onQueryChange={setSearchQuery} />

        {/* Right Section */}
        <div className="ml-6 flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-slate-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                {notificationsLoading ? (
                  <Loader2 className="w-5 h-5 text-slate-600 dark:text-slate-400 animate-spin" />
                ) : (
                  <>
                    <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>
                    )}
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96 dark:bg-slate-700 dark:border-slate-600">
              <div className="p-4 dark:text-slate-200">
                <h3 className="font-semibold mb-3">Notificações</h3>
                {notificationsLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                  </div>
                ) : notifications.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">Nenhuma notificação</p>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-3 rounded-lg text-sm border-l-4 ${
                        notif.type === 'success' ? 'bg-green-50 border-green-500' :
                        notif.type === 'error' ? 'bg-red-50 border-red-500' :
                        notif.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                        'bg-blue-50 border-blue-500'
                      } ${!notif.is_read ? 'font-medium' : ''}`}>
                        <p>{notif.title}</p>
                        <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {user?.full_name || 'Usuário'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-slate-700 dark:border-slate-600">
              <DropdownMenuItem onClick={() => setPreferencesOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Preferências
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <UserPreferences 
        user={user} 
        tenantId={tenantId} 
        isOpen={preferencesOpen} 
        onClose={() => setPreferencesOpen(false)} 
      />
      </header>

      {/* Breadcrumbs */}
      <div className="sticky top-14 z-30 dark:bg-slate-900">
        <Breadcrumbs />
      </div>
    </>
  );
});

export default DashboardHeader;