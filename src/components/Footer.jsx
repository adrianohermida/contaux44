import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Facebook, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Logo from './Logo';

export default function Footer() {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/aaa0f7f85_contaux_blue.png" 
                alt="Contaux" 
                className="h-12 brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm mb-4">Aberto das 9 às 17h, seg. à sexta, horário de Brasília.</p>
            <p className="text-slate-400 text-sm mb-4">Tel: +55 51 3021-8206</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/contauxcontadoria/" className="text-slate-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/Contaux_c" className="text-slate-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/contauxcontadoria" className="text-slate-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/contauxcontadoria" className="text-slate-400 hover:text-white">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li><Link to={createPageUrl('About')} className="text-slate-400 hover:text-white text-sm">Sobre</Link></li>
              <li><Link to={createPageUrl('Home')} className="text-slate-400 hover:text-white text-sm">Serviços</Link></li>
              <li><Link to={createPageUrl('Blog')} className="text-slate-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link to={createPageUrl('Contact')} className="text-slate-400 hover:text-white text-sm">Contato</Link></li>
            </ul>
          </div>

          {/* Acordos */}
          <div>
            <h3 className="font-bold mb-4">Acordos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Níveis de SLA</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Termos de uso</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Política de Privacidade</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Seguro de Responsabilidade</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-bold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="https://contauxcontadoria.freshdesk.com/support/tickets/new" className="text-slate-400 hover:text-white text-sm">Abrir Chamado</a></li>
              <li><a href="https://contauxcontadoria.freshdesk.com/support/home" className="text-slate-400 hover:text-white text-sm">Central de Ajuda</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">2ª via de faturas</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile Accordion Menu - Visible only on Mobile */}
        <div className="md:hidden space-y-0 mb-8">
          {/* About */}
          <div className="border-b border-slate-700">
            <div className="py-4">
              <div className="mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/aaa0f7f85_contaux_blue.png" 
                  alt="Contaux" 
                  className="h-10 brightness-0 invert"
                />
              </div>
              <p className="text-slate-400 text-xs mb-2">Aberto das 9 às 17h, seg. à sexta.</p>
              <p className="text-slate-400 text-xs mb-3">Tel: +55 51 3021-8206</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/contauxcontadoria/" className="text-slate-400 hover:text-white">
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com/Contaux_c" className="text-slate-400 hover:text-white">
                  <Twitter size={18} />
                </a>
                <a href="https://www.linkedin.com/company/contauxcontadoria" className="text-slate-400 hover:text-white">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.facebook.com/contauxcontadoria" className="text-slate-400 hover:text-white">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Menu Accordion */}
          <button
            onClick={() => toggleMenu('menu')}
            className="w-full flex items-center justify-between py-3 px-0 border-b border-slate-700 text-left"
          >
            <h3 className="font-bold text-sm">Menu</h3>
            <ChevronDown size={18} className={`transition-transform ${expandedMenu === 'menu' ? 'rotate-180' : ''}`} />
          </button>
          {expandedMenu === 'menu' && (
            <ul className="space-y-2 py-3 px-0 bg-slate-800 -mx-4 px-4 pb-3">
              <li><Link to={createPageUrl('About')} className="text-slate-300 hover:text-white text-sm block">Sobre</Link></li>
              <li><Link to={createPageUrl('Home')} className="text-slate-300 hover:text-white text-sm block">Serviços</Link></li>
              <li><Link to={createPageUrl('Blog')} className="text-slate-300 hover:text-white text-sm block">Blog</Link></li>
              <li><Link to={createPageUrl('Contact')} className="text-slate-300 hover:text-white text-sm block">Contato</Link></li>
            </ul>
          )}

          {/* Acordos Accordion */}
          <button
            onClick={() => toggleMenu('acordos')}
            className="w-full flex items-center justify-between py-3 px-0 border-b border-slate-700 text-left"
          >
            <h3 className="font-bold text-sm">Acordos</h3>
            <ChevronDown size={18} className={`transition-transform ${expandedMenu === 'acordos' ? 'rotate-180' : ''}`} />
          </button>
          {expandedMenu === 'acordos' && (
            <ul className="space-y-2 py-3 px-0 bg-slate-800 -mx-4 px-4 pb-3">
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block">Níveis de SLA</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block">Termos de uso</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block">Política de Privacidade</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block">Seguro de Responsabilidade</a></li>
            </ul>
          )}

          {/* Suporte Accordion */}
          <button
            onClick={() => toggleMenu('suporte')}
            className="w-full flex items-center justify-between py-3 px-0 border-b border-slate-700 text-left"
          >
            <h3 className="font-bold text-sm">Suporte</h3>
            <ChevronDown size={18} className={`transition-transform ${expandedMenu === 'suporte' ? 'rotate-180' : ''}`} />
          </button>
          {expandedMenu === 'suporte' && (
            <ul className="space-y-2 py-3 px-0 bg-slate-800 -mx-4 px-4 pb-3">
              <li><a href="https://contauxcontadoria.freshdesk.com/support/tickets/new" className="text-slate-300 hover:text-white text-sm block">Abrir Chamado</a></li>
              <li><a href="https://contauxcontadoria.freshdesk.com/support/home" className="text-slate-300 hover:text-white text-sm block">Central de Ajuda</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block">2ª via de faturas</a></li>
            </ul>
          )}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-6 md:pt-8 text-center text-slate-400 text-xs md:text-sm">
          <p>Copyright © 2024. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}