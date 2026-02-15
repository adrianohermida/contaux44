import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, keywords = [] } = await req.json();

    const imagePrompt = `
Professional blog cover image for an article titled "${title}".
Keywords: ${keywords.join(', ')}.

Design requirements:
- Modern, professional design
- Relevant to accounting/legal topics
- High-quality, clean layout
- Include subtle visual elements representing finance/law
- Color scheme: blues, greens, professional whites
- 1200x630px aspect ratio
- No text on the image
- Corporate and trustworthy appearance
`;

    const result = await base44.integrations.Core.GenerateImage({
      prompt: imagePrompt
    });

    return Response.json({ image_url: result.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});