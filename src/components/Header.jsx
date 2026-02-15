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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li><Link to={createPageUrl('Home')} className="text-slate-700 hover:text-blue-600 transition-colors">Início</Link></li>
            <li><Link to={createPageUrl('About')} className="text-slate-700 hover:text-blue-600 transition-colors">Sobre</Link></li>
            <li><a href="#servicos" className="text-slate-700 hover:text-blue-600 transition-colors">Serviços</a></li>
            <li><Link to={createPageUrl('Blog')} className="text-slate-700 hover:text-blue-600 transition-colors">Blog</Link></li>
            <li><Link to={createPageUrl('Contact')} className="text-slate-700 hover:text-blue-600 transition-colors">Contato</Link></li>
          </ul>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.full_name || user.email}</span>
                </button>
                {dropdownOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                     <Link
                       to={createPageUrl('Dashboard')}
                       className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2 transition-colors"
                     >
                       <User className="w-4 h-4" />
                       Dashboard
                     </Link>
                     <Link
                       to={createPageUrl('Settings')}
                       className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2 transition-colors"
                     >
                       <User className="w-4 h-4" />
                       Meu Perfil
                     </Link>
                     <hr className="my-2" />
                     <button
                       onClick={handleLogout}
                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1">
            {menuOpen ? <X size={28} className="text-slate-700" /> : <Menu size={28} className="text-slate-700" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <ul className="space-y-1 py-4">
              <li><Link to={createPageUrl('Home')} className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded transition-colors" onClick={closeMobileMenu}>Início</Link></li>
              <li><Link to={createPageUrl('About')} className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded transition-colors" onClick={closeMobileMenu}>Sobre</Link></li>
              <li><a href="#servicos" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded transition-colors">Serviços</a></li>
              <li><Link to={createPageUrl('Blog')} className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded transition-colors" onClick={closeMobileMenu}>Blog</Link></li>
              <li><Link to={createPageUrl('Contact')} className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded transition-colors" onClick={closeMobileMenu}>Contato</Link></li>
            </ul>

            {/* Mobile Auth Section */}
            <div className="border-t border-slate-200 pt-4 mt-4">
              {user ? (
                <div>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50 rounded transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {user.full_name || user.email}
                    </span>
                    <span className={`text-sm transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {mobileDropdownOpen && (
                    <div className="mt-2 space-y-1 bg-slate-50 rounded-lg p-2">
                      <Link
                        to={createPageUrl('Dashboard')}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-white rounded flex items-center gap-2 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to={createPageUrl('Settings')}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-white rounded flex items-center gap-2 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <User className="w-4 h-4" />
                        Meu Perfil
                      </Link>
                      <button
                        onClick={() => { handleLogout(); closeMobileMenu(); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-white rounded flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => {
                    base44.auth.redirectToLogin(window.location.origin + createPageUrl('Dashboard'));
                    closeMobileMenu();
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}