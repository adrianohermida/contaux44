import React from 'react';

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Bem-vindo</h1>
        <p className="text-lg text-slate-600">Acesse o dashboard para gerenciar suas chamadas VoIP.</p>
      </div>
    </div>
  );
}