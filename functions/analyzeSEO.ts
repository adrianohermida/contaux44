import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, seoTitle, seoDescription, focusKeyword = '', keywords = [] } = await req.json();

    const prompt = `Analise este conteúdo do blog em termos de SEO e retorne um relatório detalhado:

ARTIGO:
- Título: ${title}
- Meta Title: ${seoTitle || 'não definido'}
- Meta Description: ${seoDescription || 'não definida'}
- Palavra-chave principal: ${focusKeyword || 'não definida'}
- Palavras-chave secundárias: ${keywords.join(', ') || 'nenhuma'}

CONTEÚDO (primeiras 500 caracteres):
${content?.substring(0, 500) || 'vazio'}

ANÁLISE REQUERIDA:
1. SEO Score (0-100): Avalie baseado em title, meta, keywords
2. Readability Score (0-100): Avalie complexidade e compreensão
3. Comprimento do conteúdo adequado?
4. Uso de palavras-chave naturais?
5. Estrutura com headings adequada?
6. Meta description otimizada? (50-160 caracteres)
7. Title tag otimizado? (50-60 caracteres)
8. Sugestões específicas para melhoria

Retorne em JSON estruturado com scores e lista de melhorias.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          seoScore: { type: 'number' },
          readabilityScore: { type: 'number' },
          analysis: {
            type: 'object',
            properties: {
              titleOptimized: { type: 'boolean' },
              metaDescriptionOptimized: { type: 'boolean' },
              keywordUsage: { type: 'string' },
              structure: { type: 'string' },
              contentLength: { type: 'string' }
            }
          },
          suggestions: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});