import React from 'react';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Bem-vindo ao Contaux</h1>
        <p className="text-xl text-slate-600 mb-8">Contabilidade Especializada para Advogados</p>
        <a href="https://contauxcontadoria.freshdesk.com/support/signup" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold inline-block">
          Crie sua conta grátis
        </a>
      </div>
    </div>
  );
}