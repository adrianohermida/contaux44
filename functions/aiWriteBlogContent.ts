import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, keywords, focusKeyword, tone = 'professional', includeOutline = true } = await req.json();

    const prompt = `Você é um especialista em conteúdo de contabilidade e direito com profundo conhecimento em SEO.

Escreva um artigo completo otimizado para SEO com base em:
- Título: ${title}
- Palavras-chave: ${keywords?.join(', ') || ''}
- Palavra-chave principal: ${focusKeyword}
- Tom: ${tone}

Requisitos:
1. Mínimo 800 palavras
2. Estrutura clara com headings (H2, H3)
3. Parágrafos concisos (2-3 sentenças)
4. Integre naturalmente as palavras-chave
5. Inicie com uma introdução atrativa
6. Termine com conclusão e call-to-action
7. Use listas quando apropriado
8. ${includeOutline ? 'Comece com um outline/sumário' : 'Sem outline'}

Retorne em Markdown.`;

    const result = await base44.integrations.Core.InvokeLLM({
      prompt
    });

    return Response.json({ content: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});