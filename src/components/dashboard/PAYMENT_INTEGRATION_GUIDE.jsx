# Payment Entity - Integration Guide

## Overview
The Payment entity links to Invoice for full payment tracking and accounting.

## Entity Schema

```typescript
interface Payment {
  // Multi-tenancy
  tenant_id: string                    // Required

  // References
  invoice_id: string                   // Required - Link to Invoice
  client_id: string                    // Required - Link to Client

  // Payment Details
  payment_number: string               // Unique reference
  amount: number                       // Payment amount
  payment_date: ISO8601                // When payment was received
  payment_method: enum                 // bank_transfer | credit_card | debit_card | cash | check | pix | other
  status: enum                         // pending | confirmed | failed | refunded | disputed
  transaction_id: string               // External gateway reference
  currency: string                     // BRL | USD | EUR | GBP | CAD | AUD
  notes: string                        // Additional info

  // Auto-generated
  id: string
  created_date: ISO8601
  updated_date: ISO8601
  created_by: email
}
```

## Integration Points

### 1. Invoice ↔ Payment Relationship
```typescript
// When payment is created, update invoice
const payment = await base44.entities.Payment.create({
  tenant_id,
  invoice_id,
  client_id,
  amount,
  payment_date,
  payment_method: 'bank_transfer',
  status: 'pending'
});

// Update invoice paid_amount
const invoice = await base44.entities.Invoice.get(invoice_id);
const newPaidAmount = (invoice.paid_amount || 0) + amount;
const remainingBalance = invoice.total_amount - newPaidAmount;

await base44.entities.Invoice.update(invoice_id, {
  paid_amount: newPaidAmount,
  // Auto-calculate status
  status: remainingBalance <= 0 ? 'paid' : invoice.status
});
```

### 2. Payment Status Flow
```
pending → confirmed → (complete)
   ↓
 failed → (retry or dispute)
   ↓
refunded → disputed
```

### 3. Reconciliation Logic
```typescript
// Check if invoice is fully paid
const invoice = await base44.entities.Invoice.get(invoiceId);
const isPaid = invoice.paid_amount >= invoice.total_amount;
const isOverdue = new Date(invoice.due_date) < new Date() && !isPaid;

// Update invoice status automatically
if (isPaid) {
  await base44.entities.Invoice.update(invoiceId, { status: 'paid' });
}
if (isOverdue) {
  await base44.entities.Invoice.update(invoiceId, { status: 'overdue' });
}
```

## Payment Module UI (Future)

### Components Structure
```
pages/Payments
├── PaymentForm (create/edit)
├── PaymentList (virtualized list)
├── PaymentDetail (view + reconciliation)
└── PaymentReconciliation (bulk matching)
```

### Key Features
- ✅ Payment creation with invoice link
- ✅ Partial payments tracking
- ✅ Auto-invoice status update
- ✅ Payment reconciliation
- ✅ Receipt generation
- ✅ Refund handling
- ✅ Dispute tracking

## Database Queries Examples

### Get all payments for invoice
```typescript
const payments = await base44.entities.Payment.filter({
  tenant_id,
  invoice_id
});
```

### Get unpaid invoices (with payment details)
```typescript
const invoices = await base44.entities.Invoice.filter({
  tenant_id,
  status: 'sent' // Or any non-paid status
});

const unpaid = [];
for (const invoice of invoices) {
  const payments = await base44.entities.Payment.filter({
    invoice_id: invoice.id
  });
  const totalPaid = payments.reduce((sum, p) => sum + (p.status === 'confirmed' ? p.amount : 0), 0);
  if (totalPaid < invoice.total_amount) {
    unpaid.push({ invoice, payments, balance: invoice.total_amount - totalPaid });
  }
}
```

### Get received payments by date range
```typescript
const payments = await base44.entities.Payment.filter({
  tenant_id,
  status: 'confirmed'
});

const filtered = payments.filter(p => {
  const paymentDate = new Date(p.payment_date);
  return paymentDate >= startDate && paymentDate <= endDate;
});
```

## Audit & Compliance

### Required Logging
- Payment creation: action='create', entity='Payment'
- Payment confirmation: action='update', old_values/new_values
- Refund issued: action='refund', entity='Payment'
- Dispute opened: action='dispute', entity='Payment'

### Data Validation
- ✅ Amount must be > 0
- ✅ Payment date must be valid
- ✅ Payment date cannot be in future
- ✅ Amount cannot exceed invoice total + tolerance
- ✅ Transaction ID must be unique per payment method
- ✅ Client ID must match invoice client_id

## Security Considerations

1. **Multi-tenancy:** Always filter by tenant_id
2. **Authorization:** Only accounting users can confirm payments
3. **Audit Trail:** All payment changes logged
4. **Data Integrity:** Cannot delete confirmed payments (soft delete only)
5. **Fraud Prevention:** Flag duplicate amounts/dates/transaction IDs
6. **PCI Compliance:** Don't store full card numbers (if applicable)

## Integration with Accounting

### GL Posting Rules
```
Debit: Cash/Bank Account
Credit: Accounts Receivable (AR)
  When: Payment status = 'confirmed'
```

### Journal Entry Creation
```typescript
// Create JournalEntry for confirmed payment
await base44.entities.JournalEntry.create({
  tenant_id,
  date: payment.payment_date,
  entries: [
    // Debit: Cash account
    { account_id: 'cash-account', amount: payment.amount, type: 'debit' },
    // Credit: AR account
    { account_id: 'ar-account', amount: payment.amount, type: 'credit' }
  ],
  reference_entity: 'Payment',
  reference_id: payment.id,
  description: `Payment received - Invoice ${invoice.invoice_number}`
});
```

## Future Enhancements

### Phase 1 (Sprint 16)
- ✅ Payment CRUD operations
- ✅ Invoice reconciliation
- ✅ Payment status tracking
- ✅ Partial payments support

### Phase 2 (Sprint 17)
- ✅ Payment reconciliation UI
- ✅ Bulk payment import
- ✅ Bank statement matching
- ✅ Automatic GL posting

### Phase 3 (Sprint 18)
- ✅ Payment gateway integration (Stripe, PagSeguro)
- ✅ Automated payment reminders
- ✅ Chargeback handling
- ✅ Foreign exchange tracking

## Related Entities

- **Invoice:** Payment target
- **Client:** Payer information
- **JournalEntry:** GL impact
- **BankAccount:** Cash receipt location
- **AuditLog:** Compliance tracking

---

**Payment Module - Ready for Implementation** ✅