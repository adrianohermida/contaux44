import React, { useState } from 'react';
import { AlertTriangle, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';
import ContactMergeDialog from './ContactMergeDialog';

export default function DuplicateDetector({ workspaceId, contactId = null }) {
  const [isScanning, setIsScanning] = useState(false);
  const [duplicates, setDuplicates] = useState(null);
  const [selectedPair, setSelectedPair] = useState(null);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const response = await base44.functions.invoke('detectDuplicates', {
        workspace_id: workspaceId,
        contact_id: contactId,
        threshold: 0.85,
      });
      setDuplicates(response.data);
    } catch (error) {
      console.error('Error scanning duplicates:', error);
      alert('Erro ao buscar duplicatas: ' + error.message);
    } finally {
      setIsScanning(false);
    }
  };

  const handleMerge = (primary, secondary) => {
    setSelectedPair({ primary, secondary });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Detecção de Duplicatas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Identifique contatos duplicados baseado em email, documento e nome similar.
          </p>
          <Button onClick={handleScan} disabled={isScanning} className="gap-2">
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Escaneando...
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4" />
                Escanear Duplicatas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {duplicates && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Verificação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Total de Contatos</p>
                  <p className="text-2xl font-bold">{duplicates.total_contacts}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duplicatas Encontradas</p>
                  <p className="text-2xl font-bold text-red-600">{duplicates.duplicates_found}</p>
                </div>
              </div>

              {duplicates.duplicates_found === 0 ? (
                <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                  ✅ Nenhuma duplicata encontrada!
                </p>
              ) : (
                <div className="space-y-4">
                  {duplicates.duplicates.map((dup, idx) => (
                    <Card key={idx} className="border-orange-200">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              {dup.company_name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {dup.email}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Possíveis duplicatas:
                            </p>
                            {dup.matches.map((match, mIdx) => (
                              <div
                                key={mIdx}
                                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{match.company_name}</p>
                                  <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {match.email}
                                  </p>
                                  <div className="flex gap-1 mt-1">
                                    {match.match_reasons.map((reason, rIdx) => (
                                      <span
                                        key={rIdx}
                                        className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700"
                                      >
                                        {reason}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-orange-600">
                                    {Math.round(match.match_score * 100)}%
                                  </span>
                                  <Button
                                    onClick={() =>
                                      handleMerge(
                                        { id: dup.contact_id, company_name: dup.company_name, email: dup.email },
                                        { id: match.contact_id, company_name: match.company_name, email: match.email }
                                      )
                                    }
                                    size="sm"
                                    variant="outline"
                                  >
                                    Mesclar
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPair && (
        <ContactMergeDialog
          workspaceId={workspaceId}
          primaryContact={selectedPair.primary}
          secondaryContact={selectedPair.secondary}
          onClose={() => setSelectedPair(null)}
          onSuccess={() => {
            setSelectedPair(null);
            handleScan(); // Re-scan after merge
          }}
        />
      )}
    </div>
  );
}