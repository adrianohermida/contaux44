import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap } from 'lucide-react';

export default function UserOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: 1,
      title: 'Bem-vindo ao Contaux',
      description: 'Uma plataforma completa de gestão jurídica e financeira',
      status: 'completed'
    },
    {
      step: 2,
      title: 'Configure seu Perfil',
      description: 'Adicione informações pessoais e de sua empresa',
      status: 'current'
    },
    {
      step: 3,
      title: 'Integre Seus Dados',
      description: 'Importe dados existentes ou comece do zero',
      status: 'pending'
    },
    {
      step: 4,
      title: 'Configure Segurança',
      description: 'Ative 2FA e configure controle de acesso',
      status: 'pending'
    },
    {
      step: 5,
      title: 'Explore Recursos',
      description: 'Veja um tour guiado dos principais recursos',
      status: 'pending'
    }
  ];

  const features = [
    { name: 'Dashboard', icon: '📊', description: 'Visão geral completa' },
    { name: 'Blog', icon: '📝', description: 'Gerencie conteúdo' },
    { name: 'Invoicing', icon: '💰', description: 'Crie faturas' },
    { name: 'Clients', icon: '👥', description: 'Gerencie clientes' }
  ];

  const getStepStatus = (status) => {
    if (status === 'completed') return <Badge className="bg-green-100 text-green-800">✓</Badge>;
    if (status === 'current') return <Badge className="bg-blue-100 text-blue-800">⏳</Badge>;
    return <Badge className="bg-slate-100 text-slate-800">○</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Onboarding de Usuários</h1>
        <p className="text-slate-600 dark:text-slate-400">Guie novos usuários através da plataforma</p>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Seu Progresso de Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '40%' }} />
          </div>
          <p className="text-sm text-slate-600">2 de 5 passos concluídos</p>
        </CardContent>
      </Card>

      {/* Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Passos de Onboarding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {steps.map(s => (
            <div
              key={s.step}
              onClick={() => setCurrentStep(s.step - 1)}
              className={`p-4 border rounded-lg cursor-pointer transition ${
                s.status === 'current'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStepStatus(s.status)}
                  <div>
                    <p className="font-medium">Passo {s.step}: {s.title}</p>
                    <p className="text-sm text-slate-600">{s.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Step Detail */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Passo 2: Configure seu Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome Completo</label>
            <input type="text" placeholder="Seu nome" className="w-full mt-1 px-3 py-2 border rounded-lg bg-white" />
          </div>

          <div>
            <label className="text-sm font-medium">Nome da Empresa</label>
            <input type="text" placeholder="Sua empresa" className="w-full mt-1 px-3 py-2 border rounded-lg bg-white" />
          </div>

          <div>
            <label className="text-sm font-medium">Tipo de Negócio</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg bg-white">
              <option>Advogado/Escritório</option>
              <option>Consultor</option>
              <option>Empresa</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Pular</Button>
            <Button className="flex-1">Próximo</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos Principais</CardTitle>
          <CardDescription>Explore estes recursos para começar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map(feat => (
              <div key={feat.name} className="p-3 border rounded-lg text-center hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition">
                <div className="text-2xl mb-2">{feat.icon}</div>
                <p className="font-medium text-sm">{feat.name}</p>
                <p className="text-xs text-slate-600 mt-1">{feat.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle>Precisa de Ajuda?</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="outline" className="flex-1">📖 Documentação</Button>
          <Button variant="outline" className="flex-1">💬 Suporte</Button>
          <Button variant="outline" className="flex-1">🎓 Tutorial</Button>
        </CardContent>
      </Card>
    </div>
  );
}