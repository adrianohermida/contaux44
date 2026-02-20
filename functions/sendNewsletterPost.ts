import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { blogPostId } = await req.json();

    if (!blogPostId) {
      return Response.json({ error: 'blogPostId required' }, { status: 400 });
    }

    // Get blog post
    const blogPost = await base44.asServiceRole.entities.BlogPost.get(blogPostId);
    if (!blogPost) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Get all newsletter subscribers
    const subscribers = await base44.asServiceRole.entities.NewsletterSubscriber.filter({}, 'email', 1000);
    
    if (subscribers.length === 0) {
      return Response.json({ sent: 0, message: 'No subscribers found' });
    }

    // Send email to each subscriber
    const results = [];
    for (const subscriber of subscribers) {
      try {
        const emailBody = `
<h2>${blogPost.data.title}</h2>
<p>${blogPost.data.excerpt}</p>
<img src="${blogPost.data.featured_image}" alt="${blogPost.data.title}" style="max-width:100%;height:auto;">
<p>${blogPost.data.content.substring(0, 500)}...</p>
<a href="https://hermidamaia.adv.br/blog/${blogPost.data.slug}" style="background-color:#3b82f6;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Leia o artigo completo</a>
        `;

        await base44.asServiceRole.integrations.Core.SendEmail({
          to: subscriber.email,
          subject: `Novo artigo: ${blogPost.data.title}`,
          body: emailBody,
          from_name: 'Contaux Blog'
        });

        results.push({ email: subscriber.email, status: 'sent' });
      } catch (error) {
        results.push({ email: subscriber.email, status: 'failed', error: error.message });
      }
    }

    return Response.json({
      sent: results.filter(r => r.status === 'sent').length,
      failed: results.filter(r => r.status === 'failed').length,
      total: results.length,
      results
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});