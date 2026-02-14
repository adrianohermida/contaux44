import React from 'react';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Breadcrumbs */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Página de Erro</h1>
                    <p className="text-blue-100 mb-6">
                        Nem sempre um caminho leva à um lugar que você realmente deseja.
                        <br />
                        Clique em voltar e tente novamente.
                    </p>
                    <div className="flex gap-2 text-sm">
                        <a href="/" className="hover:underline">Início</a>
                        <span>/</span>
                        <span>Erro 404</span>
                    </div>
                </div>
            </section>

            {/* Error Page Area */}
            <section className="flex-grow py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Error Image */}
                        <div>
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/error.svg" 
                                alt="Erro 404"
                                className="w-full"
                            />
                        </div>
                        
                        {/* Error Text */}
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-slate-900">
                                <span className="text-blue-600">Desculpe!</span>
                                <br />
                                Página não encontrada
                            </h2>
                            <p className="text-slate-600 text-lg">
                                Ops! A página que você está procurando não existe. Ele pode ter sido movido ou excluído.
                            </p>
                            <div>
                                <a 
                                    href="/" 
                                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                                >
                                    Voltar para o início
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}