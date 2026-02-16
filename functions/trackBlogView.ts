import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { blog_post_id } = await req.json();

    if (!blog_post_id) {
      return Response.json({ error: 'blog_post_id obrigatório' }, { status: 400 });
    }

    // Incrementa views no blog post
    const posts = await base44.entities.BlogPost.filter({ id: blog_post_id });
    if (posts.length > 0) {
      const currentPost = posts[0];
      await base44.entities.BlogPost.update(blog_post_id, {
        views: (currentPost.views || 0) + 1
      });

      // Registra analytics
      const today = new Date().toISOString().split('T')[0];
      const analyticsData = await base44.entities.BlogAnalytics.filter({
        blog_post_id,
        date: today
      });

      const device = /mobile/i.test(req.headers.get('user-agent')) ? 'mobile' : 'desktop';
      const source = 'direct'; // Pode ser melhorado com referrer tracking

      if (analyticsData.length > 0) {
        // Atualiza registro existente
        await base44.entities.BlogAnalytics.update(analyticsData[0].id, {
          views: analyticsData[0].views + 1,
          unique_visitors: analyticsData[0].unique_visitors + 1
        });
      } else {
        // Cria novo registro
        await base44.entities.BlogAnalytics.create({
          blog_post_id,
          date: today,
          views: 1,
          unique_visitors: 1,
          average_time_on_page: 0,
          bounce_rate: 0,
          scroll_depth: 0,
          shares: 0,
          clicks: 0,
          source,
          device
        });
      }
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Erro ao rastrear visualização:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});