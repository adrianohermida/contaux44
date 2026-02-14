import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/aaa0f7f85_contaux_blue.png" 
                alt="Contaux" 
                className="h-12"
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
              <li><a href="#sobre" className="text-slate-400 hover:text-white text-sm">Sobre</a></li>
              <li><a href="#servicos" className="text-slate-400 hover:text-white text-sm">Serviços</a></li>
              <li><a href="#blog" className="text-slate-400 hover:text-white text-sm">Blog</a></li>
              <li><a href="#contato" className="text-slate-400 hover:text-white text-sm">Contato</a></li>
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

        {/* Bottom */}
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>Copyright © 2024. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}