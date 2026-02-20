import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Facebook, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useTheme } from './hooks/useTheme';
import Logo from './Logo';

export default function Footer() {
  const { theme } = useTheme();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const bgClass = theme === 'dark' ? 'bg-slate-950' : 'bg-slate-900';
  const borderClass = theme === 'dark' ? 'border-slate-800' : 'border-slate-700';
  const textMutedClass = theme === 'dark' ? 'text-slate-500' : 'text-slate-400';

  return (
    <footer className={`${bgClass} text-white transition-colors`}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Desktop Grid - Hidden on Mobile */}
         <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8 border-b pb-8" style={{borderColor: borderClass}}>
          {/* About */}
          <div>
            <div className="mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/aaa0f7f85_contaux_blue.png" 
                alt="Contaux" 
                className="h-12 brightness-0 invert"
              />
            </div>
            <p className={`${textMutedClass} text-sm mb-4`}>Aberto das 9 às 17h, seg. à sexta, horário de Brasília.</p>
            <p className={`${textMutedClass} text-sm mb-4`}>Tel: +55 51 3021-8206</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/contauxcontadoria/" className={`${textMutedClass} hover:text-white transition-colors`}>
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/Contaux_c" className={`${textMutedClass} hover:text-white transition-colors`}>
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/contauxcontadoria" className={`${textMutedClass} hover:text-white transition-colors`}>
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/contauxcontadoria" className={`${textMutedClass} hover:text-white transition-colors`}>
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li><Link to={createPageUrl('About')} className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Sobre</Link></li>
              <li><Link to={createPageUrl('Home')} className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Serviços</Link></li>
              <li><Link to={createPageUrl('Blog')} className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Blog</Link></li>
              <li><Link to={createPageUrl('Contact')} className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Contato</Link></li>
            </ul>
          </div>

          {/* Acordos */}
          <div>
            <h3 className="font-bold mb-4">Acordos</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Níveis de SLA</a></li>
              <li><a href="#" className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Termos de uso</a></li>
              <li><a href="#" className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Política de Privacidade</a></li>
              <li><a href="#" className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Seguro de Responsabilidade</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-bold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="https://contauxcontadoria.freshdesk.com/support/tickets/new" className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Abrir Chamado</a></li>
              <li><a href="https://contauxcontadoria.freshdesk.com/support/home" className={`${textMutedClass} hover:text-white text-sm transition-colors`}>Central de Ajuda</a></li>
              <li><a href="#" className={`${textMutedClass} hover:text-white text-sm transition-colors`}>2ª via de faturas</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile Accordion Menu - Visible only on Mobile */}
        <div className="md:hidden space-y-0 mb-8">
          {/* About */}
          <div className={`border-b ${borderClass}`}>
            <div className="py-4">
              <div className="mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/aaa0f7f85_contaux_blue.png" 
                  alt="Contaux" 
                  className="h-10 brightness-0 invert"
                />
              </div>
              <p className={`${textMutedClass} text-xs mb-2`}>Aberto das 9 às 17h, seg. à sexta.</p>
              <p className={`${textMutedClass} text-xs mb-3`}>Tel: +55 51 3021-8206</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/contauxcontadoria/" className={`${textMutedClass} hover:text-white transition-colors`}>
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com/Contaux_c" className={`${textMutedClass} hover:text-white transition-colors`}>
                  <Twitter size={18} />
                </a>
                <a href="https://www.linkedin.com/company/contauxcontadoria" className={`${textMutedClass} hover:text-white transition-colors`}>
                  <Linkedin size={18} />
                </a>
                <a href="https://www.facebook.com/contauxcontadoria" className={`${textMutedClass} hover:text-white transition-colors`}>
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Menu Accordion */}
          <button
            onClick={() => toggleMenu('menu')}
            className={`w-full flex items-center justify-between py-3 px-0 border-b text-left ${borderClass}`}
          >
            <h3 className="font-bold text-sm">Menu</h3>
            <ChevronDown size={18} className={`transition-transform ${expandedMenu === 'menu' ? 'rotate-180' : ''}`} />
          </button>
          {expandedMenu === 'menu' && (
            <ul className={`space-y-2 py-3 px-0 -mx-4 px-4 pb-3 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-800'}`}>
              <li><Link to={createPageUrl('About')} className="text-slate-300 hover:text-white text-sm block transition-colors">Sobre</Link></li>
              <li><Link to={createPageUrl('Home')} className="text-slate-300 hover:text-white text-sm block transition-colors">Serviços</Link></li>
              <li><Link to={createPageUrl('Blog')} className="text-slate-300 hover:text-white text-sm block transition-colors">Blog</Link></li>
              <li><Link to={createPageUrl('Contact')} className="text-slate-300 hover:text-white text-sm block transition-colors">Contato</Link></li>
            </ul>
          )}

          {/* Acordos Accordion */}
          <button
            onClick={() => toggleMenu('acordos')}
            className={`w-full flex items-center justify-between py-3 px-0 border-b text-left ${borderClass}`}
          >
            <h3 className="font-bold text-sm">Acordos</h3>
            <ChevronDown size={18} className={`transition-transform ${expandedMenu === 'acordos' ? 'rotate-180' : ''}`} />
          </button>
          {expandedMenu === 'acordos' && (
            <ul className={`space-y-2 py-3 px-0 -mx-4 px-4 pb-3 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-800'}`}>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block transition-colors">Níveis de SLA</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block transition-colors">Termos de uso</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block transition-colors">Seguro de Responsabilidade</a></li>
            </ul>
          )}

          {/* Suporte Accordion */}
          <button
            onClick={() => toggleMenu('suporte')}
            className={`w-full flex items-center justify-between py-3 px-0 border-b text-left ${borderClass}`}
          >
            <h3 className="font-bold text-sm">Suporte</h3>
            <ChevronDown size={18} className={`transition-transform ${expandedMenu === 'suporte' ? 'rotate-180' : ''}`} />
          </button>
          {expandedMenu === 'suporte' && (
            <ul className={`space-y-2 py-3 px-0 -mx-4 px-4 pb-3 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-800'}`}>
              <li><a href="https://contauxcontadoria.freshdesk.com/support/tickets/new" className="text-slate-300 hover:text-white text-sm block transition-colors">Abrir Chamado</a></li>
              <li><a href="https://contauxcontadoria.freshdesk.com/support/home" className="text-slate-300 hover:text-white text-sm block transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white text-sm block transition-colors">2ª via de faturas</a></li>
            </ul>
          )}
        </div>

        {/* Bottom */}
        <div className={`border-t pt-6 md:pt-8 text-center text-xs md:text-sm ${borderClass} ${textMutedClass}`}>
          <p>Copyright © 2024. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}