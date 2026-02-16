import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { blog_post_id } = await req.json();

    if (!blog_post_id) {
      return Response.json({ error: 'blog_post_id obrigatório' }, { status: 400 });
    }

    // Buscar blog post
    const posts = await base44.entities.BlogPost.filter({ id: blog_post_id });
    if (posts.length === 0) {
      return Response.json({ error: 'Blog post não encontrado' }, { status: 404 });
    }

    const post = posts[0];
    const baseUrl = req.headers.get('origin') || 'https://yoursite.com';
    const postUrl = `${baseUrl}/BlogSingle?id=${blog_post_id}`;

    // Gerar Schema.org JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.seo_description || post.excerpt,
      "image": post.featured_image,
      "datePublished": post.publish_date || post.created_date,
      "dateModified": post.updated_date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Sua Empresa",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl
      },
      "keywords": (post.seo_keywords || []).join(', '),
      "articleBody": post.content.replace(/<[^>]*>/g, '').substring(0, 500)
    };

    // Se tiver categoria, adicionar
    if (post.category_id) {
      const categories = await base44.entities.BlogCategory.filter({ id: post.category_id });
      if (categories.length > 0) {
        schema.articleSection = categories[0].name;
      }
    }

    return Response.json({
      success: true,
      schema,
      script_tag: `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});