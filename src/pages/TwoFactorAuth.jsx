import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Copy, Check, AlertCircle } from 'lucide-react';

export default function TwoFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [secret] = useState('JBSWY3DPEBLW64TMMQ======');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const backupCodes = [
    '1234-5678-90AB',
    '2345-6789-0ABC',
    '3456-7890-ABCD',
    '4567-8901-BCDE',
    '5678-9012-CDEF'
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Autenticação de Dois Fatores (2FA)</h1>
        <p className="text-slate-600 dark:text-slate-400">Proteja sua conta com camadas adicionais de segurança</p>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Status Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Autenticação de Dois Fatores</p>
              <p className="text-sm text-slate-600">Segurança aprimorada para sua conta</p>
            </div>
            <div className="flex items-center gap-3">
              {is2FAEnabled ? (
                <Badge className="bg-green-100 text-green-800">✓ Ativado</Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800">○ Desativado</Badge>
              )}
              <Button
                onClick={() => setShowSetup(!showSetup)}
                variant={is2FAEnabled ? 'outline' : 'default'}
              >
                {is2FAEnabled ? 'Modificar' : 'Ativar 2FA'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      {showSetup && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle>Configurar Autenticação de Dois Fatores</CardTitle>
            <CardDescription>Siga os passos abaixo para ativar 2FA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>
                <h3 className="font-semibold">Baixe um Aplicativo Autenticador</h3>
              </div>
              <p className="text-sm text-slate-600 ml-10">
                Use Google Authenticator, Microsoft Authenticator, Authy ou outro aplicativo compatível com TOTP.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">2</div>
                <h3 className="font-semibold">Escaneie ou Digite o Código</h3>
              </div>
              <div className="ml-10 space-y-3">
                <p className="text-sm">Código de Configuração:</p>
                <div className="flex gap-2">
                  <code className="flex-1 p-3 bg-white dark:bg-slate-900 border rounded font-mono text-sm break-all">
                    {secret}
                  </code>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-center p-4 bg-white dark:bg-slate-900 border rounded">
                  <p className="text-xs text-slate-600 mb-2">QR Code aqui</p>
                  <div className="w-32 h-32 mx-auto bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">3</div>
                <h3 className="font-semibold">Verifique o Código</h3>
              </div>
              <div className="ml-10">
                <input
                  type="text"
                  placeholder="Digite o código de 6 dígitos"
                  className="w-full px-3 py-2 border rounded-lg"
                  maxLength="6"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end ml-10">
              <Button variant="outline" onClick={() => setShowSetup(false)}>Cancelar</Button>
              <Button onClick={() => {
                setIs2FAEnabled(true);
                setShowSetup(false);
              }}>Confirmar e Ativar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Autenticação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Aplicativo Autenticador (Recomendado)</h4>
            <p className="text-sm text-slate-600 mb-3">Gera códigos de 6 dígitos a cada 30 segundos</p>
            <Badge className="bg-green-100 text-green-800">Ativo</Badge>
          </div>

          <div className="p-4 border rounded-lg opacity-60">
            <h4 className="font-medium mb-2">SMS</h4>
            <p className="text-sm text-slate-600 mb-3">Receba códigos por mensagem de texto</p>
            <Badge variant="outline">Desativado</Badge>
          </div>

          <div className="p-4 border rounded-lg opacity-60">
            <h4 className="font-medium mb-2">Email</h4>
            <p className="text-sm text-slate-600 mb-3">Receba códigos por email</p>
            <Badge variant="outline">Desativado</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Backup Codes */}
      {is2FAEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Códigos de Backup
            </CardTitle>
            <CardDescription>Use-os se perder acesso ao seu autenticador</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded border border-yellow-200">
              <p className="text-sm">Guarde esses códigos em um local seguro. Cada código pode ser usado apenas uma vez.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, i) => (
                <code key={i} className="p-2 bg-slate-100 dark:bg-slate-900 rounded text-sm">
                  {code}
                </code>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas de Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex gap-3">
            <div className="w-1 bg-blue-600 rounded"></div>
            <p>Sempre mantenha seus códigos de backup em local seguro</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-blue-600 rounded"></div>
            <p>Nunca compartilhe o código QR ou a chave de configuração</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-blue-600 rounded"></div>
            <p>Considere usar uma senha manager para armazenar backup codes</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-blue-600 rounded"></div>
            <p>Desative 2FA apenas quando você tiver acesso ao seu autenticador</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}