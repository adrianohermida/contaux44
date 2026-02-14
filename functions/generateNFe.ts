import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { invoiceId, tenantId } = await req.json();

    if (!invoiceId || !tenantId) {
      return Response.json({ error: 'Missing required fields: invoiceId, tenantId' }, { status: 400 });
    }

    // Fetch invoice data
    const invoice = await base44.entities.Invoice.get(invoiceId);
    if (!invoice || invoice.tenant_id !== tenantId) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Fetch client data
    const client = await base44.entities.Client.get(invoice.client_id);
    if (!client) {
      return Response.json({ error: 'Client not found' }, { status: 404 });
    }

    // Generate NFe XML structure (simplified)
    const nfeNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const series = '001';
    const issueDate = new Date().toISOString().split('T')[0];

    const nfeData = {
      nfe_number: nfeNumber,
      series: series,
      issue_date: issueDate,
      client_id: client.id,
      amount: invoice.total_amount,
      status: 'draft',
      description: `NFe for Invoice #${invoice.invoice_number}`
    };

    // Create TaxInvoice record
    const taxInvoice = await base44.entities.TaxInvoice.create({
      tenant_id: tenantId,
      ...nfeData
    });

    // Update original invoice status
    await base44.entities.Invoice.update(invoiceId, { status: 'issued' });

    // Send notification
    await base44.functions.invoke('sendNotifications', {
      tenantId,
      type: 'success',
      title: 'NFe Gerada',
      message: `NFe #${nfeNumber} gerada com sucesso para fatura #${invoice.invoice_number}`,
      userEmail: user.email,
      priority: 'medium'
    });

    return Response.json({ success: true, taxInvoice });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});