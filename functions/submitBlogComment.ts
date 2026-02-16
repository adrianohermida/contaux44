import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { blog_post_id, author_name, author_email, content, rating } = await req.json();

    if (!blog_post_id || !author_name || !author_email || !content) {
      return Response.json({ 
        error: 'Campos obrigatórios faltando' 
      }, { status: 400 });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(author_email)) {
      return Response.json({ 
        error: 'Email inválido' 
      }, { status: 400 });
    }

    // Criar comentário (status pending por padrão para moderação)
    const comment = await base44.entities.BlogComment.create({
      blog_post_id,
      author_name,
      author_email,
      content,
      rating: rating || 0,
      status: 'pending'
    });

    return Response.json({ 
      success: true,
      comment_id: comment.id,
      message: 'Comentário enviado para moderação'
    });

  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});