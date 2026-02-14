import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tenantId, bankAccountId } = await req.json();

    if (!tenantId || !bankAccountId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch bank account
    const bankAccount = await base44.entities.BankAccount.get(bankAccountId);
    if (!bankAccount || bankAccount.tenant_id !== tenantId) {
      return Response.json({ error: 'Bank account not found' }, { status: 404 });
    }

    // Mock sync: In production, this would integrate with bank APIs
    // For now, we'll generate mock transactions
    const mockTransactions = [
      {
        date: new Date().toISOString().split('T')[0],
        description: 'Client Payment',
        amount: 1500.00,
        type: 'credit'
      },
      {
        date: new Date().toISOString().split('T')[0],
        description: 'Service Fee',
        amount: 50.00,
        type: 'debit'
      }
    ];

    // Update bank account balance (mock)
    const balanceChange = mockTransactions.reduce((sum, t) => {
      return sum + (t.type === 'credit' ? t.amount : -t.amount);
    }, 0);

    const updatedBalance = (bankAccount.balance || 0) + balanceChange;
    await base44.entities.BankAccount.update(bankAccountId, {
      balance: updatedBalance
    });

    // Send notification
    await base44.functions.invoke('sendNotifications', {
      tenantId,
      type: 'success',
      title: 'Banco Sincronizado',
      message: `Conta ${bankAccount.account_number} sincronizada com sucesso. Novo saldo: R$ ${updatedBalance.toFixed(2)}`,
      userEmail: user.email,
      priority: 'low'
    });

    return Response.json({ 
      success: true, 
      transactions: mockTransactions,
      newBalance: updatedBalance 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});