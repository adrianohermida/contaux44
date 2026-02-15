import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, focus_keyword, seo_description } = await req.json();

    if (!title || !content) {
      return Response.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `Analyze the SEO optimization of this blog post and return a detailed report:
      
      Title: ${title}
      Content: ${content.substring(0, 2000)}
      Focus Keyword: ${focus_keyword || 'not set'}
      Meta Description: ${seo_description || 'not set'}
      
      Analyze and return JSON with:
      - seo_score (0-100)
      - readability_score (0-100)
      - strengths (array of 3-4 items)
      - improvements (array of 3-5 specific recommendations)
      - meta_suggestions (object with title_recommendation and description_recommendation)
      
      Consider: keyword usage, readability, headings, content length, meta tags.`,
      response_json_schema: {
        type: 'object',
        properties: {
          seo_score: { type: 'number' },
          readability_score: { type: 'number' },
          strengths: { type: 'array', items: { type: 'string' } },
          improvements: { type: 'array', items: { type: 'string' } },
          meta_suggestions: {
            type: 'object',
            properties: {
              title_recommendation: { type: 'string' },
              description_recommendation: { type: 'string' }
            }
          }
        }
      }
    });

    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});