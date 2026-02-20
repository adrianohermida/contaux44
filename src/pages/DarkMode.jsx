import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';

export default function DarkMode() {
  const [theme, setTheme] = useState('auto');
  const [accentColor, setAccentColor] = useState('blue');

  const colors = [
    { name: 'blue', hex: '#3b82f6' },
    { name: 'green', hex: '#10b981' },
    { name: 'purple', hex: '#8b5cf6' },
    { name: 'pink', hex: '#ec4899' },
    { name: 'red', hex: '#ef4444' },
    { name: 'amber', hex: '#f59e0b' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Modo Escuro e Temas</h1>
        <p className="text-slate-600 dark:text-slate-400">Personalize a aparência da interface</p>
      </div>

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Modo de Tema</CardTitle>
          <CardDescription>Escolha como o aplicativo deve aparecer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Light */}
            <div
              onClick={() => setTheme('light')}
              className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                theme === 'light'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                <Sun className="h-12 w-12 text-yellow-600" />
              </div>
              <p className="font-medium text-center mb-2">Modo Claro</p>
              <p className="text-sm text-slate-600 text-center">Sempre claro</p>
            </div>

            {/* Dark */}
            <div
              onClick={() => setTheme('dark')}
              className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                theme === 'dark'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                <Moon className="h-12 w-12 text-slate-800 dark:text-slate-200" />
              </div>
              <p className="font-medium text-center mb-2">Modo Escuro</p>
              <p className="text-sm text-slate-600 text-center">Sempre escuro</p>
            </div>

            {/* Auto */}
            <div
              onClick={() => setTheme('auto')}
              className={`p-6 border-2 rounded-lg cursor-pointer transition ${
                theme === 'auto'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                <Monitor className="h-12 w-12 text-slate-600" />
              </div>
              <p className="font-medium text-center mb-2">Automático</p>
              <p className="text-sm text-slate-600 text-center">Conforme sistema</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accent Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Cor de Destaque
          </CardTitle>
          <CardDescription>Personalize a cor principal da interface</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {colors.map(color => (
              <button
                key={color.name}
                onClick={() => setAccentColor(color.name)}
                className={`w-16 h-16 rounded-lg transition border-2 ${
                  accentColor === color.name
                    ? 'border-slate-900 dark:border-slate-100'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-4">
            Selecionado: <Badge>{accentColor}</Badge>
          </p>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light Preview */}
            <div className="bg-white border rounded-lg p-6 space-y-3">
              <p className="text-sm text-slate-600">Modo Claro</p>
              <div className="space-y-2">
                <div className="h-8 bg-blue-600 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>

            {/* Dark Preview */}
            <div className="bg-slate-950 border border-slate-700 rounded-lg p-6 space-y-3">
              <p className="text-sm text-slate-400">Modo Escuro</p>
              <div className="space-y-2">
                <div className="h-8 bg-blue-600 rounded"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">Reduzir Movimento</span>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">Alto Contraste</span>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">Modo Compacto</span>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium">Fonte Maior</span>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="w-full">Salvar Preferências</Button>
    </div>
  );
}