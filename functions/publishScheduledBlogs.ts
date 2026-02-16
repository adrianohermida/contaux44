import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Busca blogs agendados cuja data já passou
    const now = new Date().toISOString();
    const scheduledBlogs = await base44.asServiceRole.entities.BlogPost.filter({
      status: 'scheduled'
    });

    const toPublish = scheduledBlogs.filter(blog => 
      blog.scheduled_date && new Date(blog.scheduled_date) <= new Date()
    );

    const results = [];

    for (const blog of toPublish) {
      try {
        await base44.asServiceRole.entities.BlogPost.update(blog.id, {
          status: 'published',
          publish_date: new Date().toISOString()
        });

        results.push({
          id: blog.id,
          title: blog.title,
          status: 'published'
        });

        // Enviar newsletter automática se configurado
        try {
          await base44.asServiceRole.functions.invoke('sendNewsletterPost', {
            blog_post_id: blog.id
          });
        } catch (newsletterError) {
          console.log('Newsletter error:', newsletterError.message);
        }

        // TODO: Implementar compartilhamento social automático nas redes sociais
        // if (blog.auto_share) { ... }

      } catch (error) {
        results.push({
          id: blog.id,
          title: blog.title,
          status: 'error',
          error: error.message
        });
      }
    }

    return Response.json({
      success: true,
      published: results.length,
      results
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});