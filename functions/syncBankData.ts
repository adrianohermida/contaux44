import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // This function is called by automation, fetch tenantId from request payload
    let tenantId = null;
    let bankAccountId = null;
    
    try {
      const body = await req.json();
      tenantId = body.tenantId;
      bankAccountId = body.bankAccountId;
    } catch {
      // If no JSON body, this is a scheduled task - need to get tenant from somewhere
      return Response.json({ error: 'Missing tenantId in request body' }, { status: 400 });
    }

    if (!tenantId) {
      return Response.json({ error: 'Missing required field: tenantId' }, { status: 400 });
    }

    // If specific bankAccountId provided, sync only that account
    // Otherwise, sync all active bank accounts for this tenant
    let bankAccounts = [];
    
    if (bankAccountId) {
      const bankAccount = await base44.asServiceRole.entities.BankAccount.get(bankAccountId);
      if (bankAccount && bankAccount.tenant_id === tenantId && bankAccount.status === 'active') {
        bankAccounts = [bankAccount];
      }
    } else {
      // Fetch all active bank accounts for the tenant
      bankAccounts = await base44.asServiceRole.entities.BankAccount.filter({
        tenant_id: tenantId,
        status: 'active'
      });
    }

    if (bankAccounts.length === 0) {
      return Response.json({ 
        success: true, 
        message: 'No active bank accounts to sync',
        syncedCount: 0
      });
    }

    let syncResults = [];

    // Process each bank account
    for (const bankAccount of bankAccounts) {
      try {
        // Mock sync: In production, this would integrate with bank APIs
        const mockTransactions = [
          {
            date: new Date().toISOString().split('T')[0],
            description: 'Client Payment',
            amount: Math.random() * 5000,
            type: 'credit'
          },
          {
            date: new Date().toISOString().split('T')[0],
            description: 'Service Fee',
            amount: Math.random() * 500,
            type: 'debit'
          }
        ];

        // Update bank account balance
        const balanceChange = mockTransactions.reduce((sum, t) => {
          return sum + (t.type === 'credit' ? t.amount : -t.amount);
        }, 0);

        const updatedBalance = (bankAccount.balance || 0) + balanceChange;
        await base44.asServiceRole.entities.BankAccount.update(bankAccount.id, {
          balance: updatedBalance
        });

        syncResults.push({
          accountNumber: bankAccount.account_number,
          success: true,
          previousBalance: bankAccount.balance,
          newBalance: updatedBalance,
          changeAmount: balanceChange
        });
      } catch (accountError) {
        syncResults.push({
          accountNumber: bankAccount.account_number,
          success: false,
          error: accountError.message
        });
      }
    }

    // Send summary notification
    const successCount = syncResults.filter(r => r.success).length;
    const message = `${successCount} de ${syncResults.length} contas bancárias sincronizadas com sucesso`;
    
    await base44.asServiceRole.entities.Notification.create({
      tenant_id: tenantId,
      user_email: 'system@contaux.local',
      title: 'Sincronização Bancária',
      message: message,
      type: 'info',
      priority: 'low',
      status: 'sent'
    });

    return Response.json({ 
      success: true, 
      message: message,
      syncedCount: successCount,
      results: syncResults
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});