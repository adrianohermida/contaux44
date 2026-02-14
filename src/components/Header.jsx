import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <img src="/assets/images/contaux_blue.png" alt="Contaux" className="w-10 h-10" />
            <span className="text-blue-600 font-bold text-lg">Contaux</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li><a href="#home" className="text-slate-700 hover:text-blue-600">Início</a></li>
            <li><a href="#sobre" className="text-slate-700 hover:text-blue-600">Sobre</a></li>
            <li><a href="#servicos" className="text-slate-700 hover:text-blue-600">Serviços</a></li>
            <li><Link to={createPageUrl('Blog')} className="text-slate-700 hover:text-blue-600">Blog</Link></li>
            <li><Link to={createPageUrl('Contact')} className="text-slate-700 hover:text-blue-600">Contato</Link></li>
          </ul>

          {/* Login Button */}
          <a href="https://contauxcontadoria.freshdesk.com/support/login" className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </a>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden pb-4 space-y-2">
            <li><a href="#home" className="block py-2 text-slate-700">Início</a></li>
            <li><a href="#sobre" className="block py-2 text-slate-700">Sobre</a></li>
            <li><a href="#servicos" className="block py-2 text-slate-700">Serviços</a></li>
            <li><Link to={createPageUrl('Blog')} className="block py-2 text-slate-700">Blog</Link></li>
            <li><Link to={createPageUrl('Contact')} className="block py-2 text-slate-700">Contato</Link></li>
            <li><a href="https://contauxcontadoria.freshdesk.com/support/login" className="block py-2 text-blue-600 font-semibold">Login</a></li>
          </ul>
        )}
      </div>
    </header>
  );
}