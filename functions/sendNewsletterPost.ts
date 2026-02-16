import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { blog_post_id } = await req.json();

    if (!blog_post_id) {
      return Response.json({ error: 'blog_post_id obrigatório' }, { status: 400 });
    }

    // Buscar post
    const posts = await base44.asServiceRole.entities.BlogPost.filter({ id: blog_post_id });
    if (posts.length === 0) {
      return Response.json({ error: 'Post não encontrado' }, { status: 404 });
    }

    const post = posts[0];

    // Buscar subscribers
    const subscribers = await base44.asServiceRole.entities.NewsletterSubscriber.filter({ 
      status: 'active' 
    });

    if (subscribers.length === 0) {
      return Response.json({ success: true, sent: 0, message: 'Nenhum subscriber ativo' });
    }

    const baseUrl = req.headers.get('origin') || 'https://yoursite.com';
    const postUrl = `${baseUrl}/BlogSingle?id=${blog_post_id}`;

    let sentCount = 0;
    const errors = [];

    // Enviar email para cada subscriber
    for (const subscriber of subscribers) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: subscriber.email,
          subject: `📰 Novo artigo: ${post.title}`,
          body: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb;">${post.title}</h1>
              ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title}" style="width: 100%; border-radius: 8px; margin: 20px 0;" />` : ''}
              <p style="font-size: 16px; color: #4b5563;">${post.excerpt}</p>
              <a href="${postUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Ler artigo completo</a>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="font-size: 12px; color: #9ca3af;">Você está recebendo este email porque se inscreveu na nossa newsletter. <a href="${baseUrl}/unsubscribe?email=${subscriber.email}">Cancelar inscrição</a></p>
            </div>
          `
        });
        sentCount++;
      } catch (error) {
        errors.push({ email: subscriber.email, error: error.message });
      }
    }

    return Response.json({
      success: true,
      sent: sentCount,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});