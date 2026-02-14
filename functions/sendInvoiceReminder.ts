import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // This function can be called by system/admin without user context
    const { tenantId, invoiceId } = await req.json();

    if (!tenantId || !invoiceId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch invoice and client
    const invoice = await base44.asServiceRole.entities.Invoice.get(invoiceId);
    if (!invoice || invoice.tenant_id !== tenantId) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const client = await base44.asServiceRole.entities.Client.get(invoice.client_id);
    if (!client) {
      return Response.json({ error: 'Client not found' }, { status: 404 });
    }

    // Calculate days until due
    const dueDate = new Date(invoice.due_date);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntilDue <= 0) {
      // Invoice is overdue
      const daysPast = Math.abs(daysUntilDue);
      const emailBody = `
        A fatura #${invoice.invoice_number} está ATRASADA há ${daysPast} dia(s).
        
        Valor: R$ ${invoice.total_amount.toFixed(2)}
        Data de vencimento: ${dueDate.toLocaleDateString('pt-BR')}
        
        Por favor, regularize imediatamente.
      `;

      await base44.integrations.Core.SendEmail({
        to: client.email,
        subject: `[URGENTE] Fatura Atrasada #${invoice.invoice_number}`,
        body: emailBody
      });
    } else if (daysUntilDue <= 7) {
      // Invoice is due soon
      const emailBody = `
        A fatura #${invoice.invoice_number} vence em ${daysUntilDue} dia(s).
        
        Valor: R$ ${invoice.total_amount.toFixed(2)}
        Data de vencimento: ${dueDate.toLocaleDateString('pt-BR')}
        
        Lembramos que o pagamento é necessário.
      `;

      await base44.integrations.Core.SendEmail({
        to: client.email,
        subject: `Fatura vencendo em breve #${invoice.invoice_number}`,
        body: emailBody
      });
    }

    // Create notification record
    await base44.asServiceRole.entities.Notification.create({
      tenant_id: tenantId,
      user_email: client.email,
      title: 'Lembrete de Fatura',
      message: `Fatura #${invoice.invoice_number} vence em ${daysUntilDue} dia(s)`,
      type: daysUntilDue <= 0 ? 'alert' : 'warning',
      priority: daysUntilDue <= 0 ? 'urgent' : 'high',
      related_entity: 'Invoice',
      related_entity_id: invoiceId,
      status: 'sent'
    });

    return Response.json({ success: true, message: 'Reminder sent' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});