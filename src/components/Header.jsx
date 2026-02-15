import React, { useEffect, useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import Logo from './Logo';

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li><Link to={createPageUrl('Home')} className="text-slate-700 hover:text-blue-600">Início</Link></li>
            <li><Link to={createPageUrl('About')} className="text-slate-700 hover:text-blue-600">Sobre</Link></li>
            <li><a href="#servicos" className="text-slate-700 hover:text-blue-600">Serviços</a></li>
            <li><Link to={createPageUrl('Blog')} className="text-slate-700 hover:text-blue-600">Blog</Link></li>
            <li><Link to={createPageUrl('Contact')} className="text-slate-700 hover:text-blue-600">Contato</Link></li>
          </ul>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.full_name || user.email}</span>
                </button>
                {dropdownOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                     <Link
                       to={createPageUrl('Dashboard')}
                       className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                     >
                       <User className="w-4 h-4" />
                       Dashboard
                     </Link>
                     <Link
                       to={createPageUrl('Settings')}
                       className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                     >
                       <User className="w-4 h-4" />
                       Meu Perfil
                     </Link>
                     <hr className="my-2" />
                     <button
                       onClick={handleLogout}
                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                     >
                       <LogOut className="w-4 h-4" />
                       Sair
                     </button>
                   </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => base44.auth.redirectToLogin(window.location.origin + createPageUrl('Dashboard'))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden pb-4 space-y-2">
            <li><Link to={createPageUrl('Home')} className="block py-2 text-slate-700">Início</Link></li>
            <li><Link to={createPageUrl('About')} className="block py-2 text-slate-700">Sobre</Link></li>
            <li><a href="#servicos" className="block py-2 text-slate-700">Serviços</a></li>
            <li><Link to={createPageUrl('Blog')} className="block py-2 text-slate-700">Blog</Link></li>
            <li><Link to={createPageUrl('Contact')} className="block py-2 text-slate-700">Contato</Link></li>
            <li>
              {user ? (
                <button onClick={handleLogout} className="block py-2 text-red-600 font-semibold w-full text-left">
                  Sair
                </button>
              ) : (
                <button 
                  onClick={() => base44.auth.redirectToLogin(window.location.origin + createPageUrl('Dashboard'))}
                  className="block py-2 text-blue-600 font-semibold"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}