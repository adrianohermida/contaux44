import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { jsPDF } from 'npm:jspdf@4.0.0';

/**
 * Gera relatório PDF com dados de fatura
 */
Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Only POST allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { tenant_id, invoice_id } = body;

    if (!tenant_id || !invoice_id) {
      return Response.json({ error: 'Missing tenant_id or invoice_id' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Busca fatura e cliente
    const invoices = await base44.asServiceRole.entities.Invoice.filter({ tenant_id, id: invoice_id });
    if (!invoices || invoices.length === 0) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const invoice = invoices[0];
    
    const clients = await base44.asServiceRole.entities.Client.filter({ tenant_id, id: invoice.client_id });
    const client = clients?.[0];

    // Cria PDF
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFontSize(20);
    doc.text('FATURA', 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Número: ${invoice.invoice_number}`, 20, 35);
    doc.text(`Data: ${new Date(invoice.issue_date).toLocaleDateString('pt-BR')}`, 20, 42);
    doc.text(`Vencimento: ${new Date(invoice.due_date).toLocaleDateString('pt-BR')}`, 20, 49);

    // Cliente
    doc.setFontSize(12);
    doc.text('CLIENTE', 20, 65);
    doc.setFontSize(10);
    doc.text(`${client?.company_name || 'N/A'}`, 20, 75);
    doc.text(`Email: ${client?.email || 'N/A'}`, 20, 82);
    doc.text(`Telefone: ${client?.phone || 'N/A'}`, 20, 89);

    // Itens
    doc.setFontSize(12);
    doc.text('ITENS', 20, 110);
    
    let yPos = 120;
    doc.setFontSize(10);
    doc.text('Descrição', 20, yPos);
    doc.text('Qtd', 100, yPos);
    doc.text('Valor Unit.', 130, yPos);
    doc.text('Total', 170, yPos);
    
    yPos += 10;
    
    if (invoice.items && Array.isArray(invoice.items)) {
      invoice.items.forEach(item => {
        const lineTotal = (item.quantity || 0) * (item.unit_price || 0);
        doc.text(item.description?.substring(0, 30) || '', 20, yPos);
        doc.text(String(item.quantity || 0), 100, yPos);
        doc.text(`R$ ${(item.unit_price || 0).toFixed(2)}`, 130, yPos);
        doc.text(`R$ ${lineTotal.toFixed(2)}`, 170, yPos);
        yPos += 7;
      });
    }

    // Totais
    yPos += 10;
    doc.setFontSize(11);
    doc.text(`Subtotal: R$ ${((invoice.total_amount - invoice.tax_amount) || 0).toFixed(2)}`, 120, yPos);
    yPos += 8;
    doc.text(`Impostos: R$ ${(invoice.tax_amount || 0).toFixed(2)}`, 120, yPos);
    yPos += 8;
    doc.setFontSize(12);
    doc.text(`TOTAL: R$ ${(invoice.total_amount || 0).toFixed(2)}`, 120, yPos);

    // Status
    yPos += 15;
    doc.setFontSize(10);
    doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, yPos);

    // Log no audit
    await base44.asServiceRole.entities.AuditLog.create({
      tenant_id,
      user_email: 'pdf@export',
      action: 'export',
      entity_type: 'Invoice',
      entity_id: invoice_id,
      new_values: { format: 'PDF' },
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: 'pdf-generator',
      status: 'success',
      timestamp: new Date().toISOString()
    });

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice_${invoice.invoice_number}.pdf"`
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});