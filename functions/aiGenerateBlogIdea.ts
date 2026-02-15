import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { topic, keywords, tone = 'professional' } = await req.json();

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Você é um especialista em content marketing para contabilidade e direito. 
      
Gere 5 ideias de blogs altamente otimizados para SEO baseado no seguinte:
- Tema: ${topic}
- Palavras-chave alvo: ${keywords?.join(', ') || 'não especificadas'}
- Tom: ${tone}

Para cada ideia, forneça:
1. Título (otimizado para SEO)
2. Slug (URL-friendly)
3. Resumo (2-3 linhas)
4. Palavras-chave principais
5. Tone/estilo sugerido

Retorne em JSON.`,
      response_json_schema: {
        type: 'object',
        properties: {
          ideas: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                slug: { type: 'string' },
                excerpt: { type: 'string' },
                keywords: {
                  type: 'array',
                  items: { type: 'string' }
                },
                focusKeyword: { type: 'string' },
                tone: { type: 'string' }
              }
            }
          }
        }
      }
    });

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});