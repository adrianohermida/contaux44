import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Predictive Report - Gera relatórios com análise preditiva
 * Integra com AI para insights futuros
 */
export default function PredictiveReport({ workspaceId, reportType = 'revenue' }) {
  const [predictiveAnalysis, setPredictiveAnalysis] = useState(null);
  const [generating, setGenerating] = useState(false);

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['predictive-data', workspaceId, reportType],
    queryFn: async () => {
      if (reportType === 'revenue') {
        return base44.entities.Invoice.filter({ workspace_id: workspaceId });
      } else if (reportType === 'payment') {
        return base44.entities.Payment.filter({ workspace_id: workspaceId });
      }
      return [];
    },
    enabled: !!workspaceId
  });

  const generatePrediction = async () => {
    if (!reportData) return;
    setGenerating(true);
    try {
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: buildPredictivePrompt(reportType, reportData),
        response_json_schema: {
          type: 'object',
          properties: {
            forecast: { type: 'string' },
            risks: { type: 'array', items: { type: 'string' } },
            opportunities: { type: 'array', items: { type: 'string' } },
            recommendations: { type: 'array', items: { type: 'string' } },
            confidence: { type: 'number' }
          }
        }
      });
      setPredictiveAnalysis(analysis);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (reportData) {
      generatePrediction();
    }
  }, [reportData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span>Carregando dados...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {generating && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span className="text-sm">Gerando análise preditiva...</span>
        </div>
      )}

      {predictiveAnalysis && (
        <>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Previsão</h3>
                <p className="text-sm text-blue-800">{predictiveAnalysis.forecast}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded">
                    Confiança: {Math.round(predictiveAnalysis.confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {predictiveAnalysis.risks?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Riscos Identificados</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    {predictiveAnalysis.risks.map((risk, i) => (
                      <li key={i}>• {risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {predictiveAnalysis.opportunities?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">Oportunidades</h3>
              <ul className="text-sm text-green-800 space-y-1">
                {predictiveAnalysis.opportunities.map((opp, i) => (
                  <li key={i}>✓ {opp}</li>
                ))}
              </ul>
            </div>
          )}

          {predictiveAnalysis.recommendations?.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Recomendações</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {predictiveAnalysis.recommendations.map((rec, i) => (
                  <li key={i}>→ {rec}</li>
                ))}
              </ul>
            </div>
          )}

          <Button onClick={generatePrediction} disabled={generating} className="w-full">
            Atualizar Análise
          </Button>
        </>
      )}
    </div>
  );
}

function buildPredictivePrompt(reportType, data) {
  const context = reportType === 'revenue'
    ? `Dados de faturamento: ${JSON.stringify(data.slice(0, 10))}`
    : `Dados de pagamento: ${JSON.stringify(data.slice(0, 10))}`;

  return `Você é um analista de negócios especializado em análise preditiva.

${context}

Gere uma análise preditiva que inclua:
- Previsão sobre a tendência futura
- Riscos potenciais
- Oportunidades de melhoria
- Recomendações acionáveis
- Confiança da análise (0-1)`;
}