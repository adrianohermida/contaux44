import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, phone, subject, message } = await req.json();

    // Validar campos obrigatórios
    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // Salvar mensagem no banco
    const messageRecord = await base44.asServiceRole.entities.ContactMessage.create({
      name: name,
      email: email,
      phone: phone || '',
      subject: subject,
      message: message,
      status: 'new'
    });

    // Enviar email de confirmação ao remetente
    await base44.integrations.Core.SendEmail({
      to: email,
      subject: `Confirmação de recebimento: ${subject}`,
      body: `Olá ${name},\n\nRecebemos sua mensagem e entraremos em contato em breve.\n\nAtenciosamente,\nContaux Contabilidade`
    });

    // Notificar admin (opcional - comentado para não enviar email real)
    // await base44.integrations.Core.SendEmail({
    //   to: 'admin@contaux.com.br',
    //   subject: `Nova mensagem de contato: ${subject}`,
    //   body: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`
    // });

    return Response.json({ success: true, message: 'Mensagem enviada com sucesso', id: messageRecord.id });
  } catch (error) {
    console.error('Erro:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});