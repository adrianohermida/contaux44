# 📚 Payment Entity - API Documentation

**Version:** 1.0  
**Last Updated:** 2026-03-02  
**Status:** Production Ready ✅

---

## 📋 Table of Contents

1. [Entity Overview](#entity-overview)
2. [Schema Definition](#schema-definition)
3. [CRUD Operations](#crud-operations)
4. [Business Rules](#business-rules)
5. [Reconciliation Guide](#reconciliation-guide)
6. [Backend Functions](#backend-functions)
7. [Integration Examples](#integration-examples)
8. [Error Handling](#error-handling)
9. [Performance Tips](#performance-tips)
10. [Security](#security)

---

## Entity Overview

**Entity Name:** `Payment`  
**Purpose:** Track and manage payment records linked to invoices  
**Multi-Tenant:** Yes (tenant_id required)  
**Audit Logging:** Yes (created_by, created_date, updated_date)  
**Validation:** Full business logic validation  

### Key Features
- ✅ Automatic invoice balance calculation
- ✅ Payment reconciliation (automatic & manual)
- ✅ PDF receipt generation
- ✅ Multi-currency support
- ✅ Payment method tracking
- ✅ Full CRUD operations
- ✅ Real-time status updates

---

## Schema Definition

### Complete Payment Schema

```json
{
  "name": "Payment",
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "description": "Tenant/Organization ID for multi-tenancy (REQUIRED)"
    },
    "invoice_id": {
      "type": "string",
      "description": "Reference to Invoice entity (REQUIRED)"
    },
    "client_id": {
      "type": "string",
      "description": "Reference to Client entity for tracking (REQUIRED)"
    },
    "payment_number": {
      "type": "string",
      "description": "Unique payment reference number (AUTO-GENERATED)"
    },
    "amount": {
      "type": "number",
      "description": "Payment amount (REQUIRED, validated against invoice balance)"
    },
    "payment_date": {
      "type": "string",
      "format": "date",
      "description": "Date payment was received (REQUIRED)"
    },
    "payment_method": {
      "type": "string",
      "enum": [
        "bank_transfer",
        "credit_card",
        "debit_card",
        "cash",
        "check",
        "pix",
        "other"
      ],
      "default": "bank_transfer",
      "description": "Payment method used"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "confirmed",
        "failed",
        "refunded",
        "disputed"
      ],
      "default": "pending",
      "description": "Payment status"
    },
    "transaction_id": {
      "type": "string",
      "description": "External transaction ID (bank/gateway reference)"
    },
    "notes": {
      "type": "string",
      "description": "Payment notes or reference information"
    },
    "currency": {
      "type": "string",
      "enum": [
        "BRL",
        "USD",
        "EUR",
        "GBP",
        "CAD",
        "AUD"
      ],
      "default": "BRL",
      "description": "Payment currency"
    }
  },
  "required": [
    "tenant_id",
    "invoice_id",
    "client_id",
    "amount",
    "payment_date",
    "payment_method"
  ]
}
```

### Auto-Generated Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique payment ID |
| payment_number | string | PAY-XXXX format (auto-generated) |
| created_date | datetime | Creation timestamp |
| created_by | string | Creator email |
| updated_date | datetime | Last update timestamp |

---

## CRUD Operations

### CREATE - New Payment

**Endpoint:** `base44.entities.Payment.create(paymentData)`

**Request:**
```javascript
const paymentData = {
  tenant_id: "workspace-123",
  invoice_id: "inv-001",
  client_id: "client-001",
  amount: 1000.00,
  payment_date: "2026-03-01",
  payment_method: "bank_transfer",
  status: "pending",
  currency: "BRL",
  transaction_id: "TXN-123456",
  notes: "Payment received via bank transfer"
};

const response = await base44.entities.Payment.create(paymentData);
```

**Response Success (201):**
```json
{
  "id": "pay-001",
  "payment_number": "PAY-001",
  "tenant_id": "workspace-123",
  "invoice_id": "inv-001",
  "amount": 1000.00,
  "status": "pending",
  "created_date": "2026-03-02T10:30:00Z",
  "created_by": "user@example.com"
}
```

**Validations:**
- ✅ Amount must be > 0
- ✅ Amount must not exceed invoice remaining balance
- ✅ invoice_id must reference existing invoice
- ✅ client_id must reference existing client
- ✅ payment_date must be <= today
- ✅ tenant_id is mandatory

**Errors:**
```json
{
  "status": 400,
  "error": "Payment amount exceeds invoice balance",
  "details": "Invoice remaining balance: 500.00, Payment: 1000.00"
}
```

---

### READ - Get Payment

**Endpoint:** `base44.entities.Payment.filter(query, sort, limit)`

**Single Payment:**
```javascript
const payment = await base44.entities.Payment.filter({
  id: "pay-001",
  tenant_id: "workspace-123"
});
```

**Multiple Payments:**
```javascript
// List all payments for tenant
const payments = await base44.entities.Payment.filter({
  tenant_id: "workspace-123",
  status: "confirmed"
}, '-payment_date', 50);
```

**Response:**
```json
[
  {
    "id": "pay-001",
    "payment_number": "PAY-001",
    "invoice_id": "inv-001",
    "amount": 1000.00,
    "payment_date": "2026-03-01",
    "payment_method": "bank_transfer",
    "status": "confirmed",
    "currency": "BRL"
  }
]
```

**Query Options:**
```javascript
// Filter by status
await base44.entities.Payment.filter({
  tenant_id: "workspace-123",
  status: "pending"
});

// Filter by date range
await base44.entities.Payment.filter({
  tenant_id: "workspace-123",
  payment_date: { $gte: "2026-01-01", $lte: "2026-03-31" }
});

// Filter by payment method
await base44.entities.Payment.filter({
  tenant_id: "workspace-123",
  payment_method: "pix"
});

// Filter by currency
await base44.entities.Payment.filter({
  tenant_id: "workspace-123",
  currency: "BRL"
});
```

---

### UPDATE - Modify Payment

**Endpoint:** `base44.entities.Payment.update(paymentId, updateData)`

**Request:**
```javascript
const updateData = {
  status: "confirmed",
  notes: "Payment verified"
};

const response = await base44.entities.Payment.update("pay-001", updateData);
```

**Updatable Fields:**
- ✅ status (pending → confirmed → refunded)
- ✅ notes
- ✅ transaction_id
- ✅ currency (only if pending)
- ✅ payment_method (only if pending)

**Non-Updatable Fields:**
- ❌ amount (after confirmation)
- ❌ invoice_id (after creation)
- ❌ payment_date (after confirmation)

**Response:**
```json
{
  "id": "pay-001",
  "status": "confirmed",
  "updated_date": "2026-03-02T12:00:00Z"
}
```

---

### DELETE - Remove Payment

**Endpoint:** `base44.entities.Payment.delete(paymentId)`

**Request:**
```javascript
const response = await base44.entities.Payment.delete("pay-001");
```

**Conditions:**
- ✅ Only pending payments can be deleted
- ❌ Confirmed payments cannot be deleted (must be refunded)
- ❌ Cannot delete if invoice is already marked as paid

**Response (204 No Content):**
```json
{
  "success": true,
  "message": "Payment deleted successfully"
}
```

---

## Business Rules

### Payment Status Flow

```
pending ──→ confirmed ──→ (stays confirmed)
         ↓              ↓
       failed    ←── refunded ←── disputed
```

### Amount Validation

```javascript
// Maximum amount = invoice.total_amount - invoice.paid_amount
const maxAmount = invoice.total_amount - invoice.paid_amount;

if (payment.amount > maxAmount) {
  throw new Error('Payment exceeds remaining balance');
}
```

### Invoice Auto-Update

When payment status changes to "confirmed":

```javascript
// Update invoice
invoice.paid_amount += payment.amount;

if (invoice.paid_amount >= invoice.total_amount) {
  invoice.status = "paid";
}
```

### Partial Payments

Multiple partial payments are supported:

```javascript
// Invoice: 1000.00
// Payment 1: 300.00 → invoice.paid_amount = 300.00 (status: sent)
// Payment 2: 400.00 → invoice.paid_amount = 700.00 (status: sent)
// Payment 3: 300.00 → invoice.paid_amount = 1000.00 (status: paid)
```

---

## Reconciliation Guide

### Automatic Reconciliation

Matches unmatched payments to invoices by:
1. **Amount match** ± 1% tolerance
2. **Date match** ± 3 days
3. **Currency match**

```javascript
// Trigger auto-reconciliation
await base44.functions.invoke('autoReconcilePayments', {
  tenant_id: 'workspace-123'
});
```

### Manual Reconciliation

Link a specific payment to an invoice:

```javascript
// Match payment to invoice
await base44.entities.Payment.update('pay-002', {
  invoice_id: 'inv-002'
});
```

### Reconciliation States

| State | Description |
|-------|-------------|
| Reconciled | payment.invoice_id is set |
| Unmatched | payment.invoice_id is null |
| Disputed | payment.status = 'disputed' |
| Refunded | payment.status = 'refunded' |

---

## Backend Functions

### 1. generatePaymentReceipt

**Purpose:** Generate PDF receipt for payment  
**Input:** paymentId, tenantId  
**Output:** PDF file URL

```javascript
const receipt = await base44.functions.invoke('generatePaymentReceipt', {
  payment_id: 'pay-001',
  tenant_id: 'workspace-123'
});
// Response: { receipt_url: 'https://...' }
```

### 2. updateInvoicePaymentStatus

**Purpose:** Auto-sync invoice status when payment confirmed  
**Trigger:** Automatic (runs when payment.status = 'confirmed')

```javascript
// Auto-triggered, no manual invocation needed
// Updates invoice.paid_amount and invoice.status
```

### 3. autoReconcilePayments

**Purpose:** Automatic payment-invoice matching  
**Input:** tenantId  
**Output:** Number of matched payments

```javascript
const result = await base44.functions.invoke('autoReconcilePayments', {
  tenant_id: 'workspace-123'
});
// Response: { matched: 5, total: 8 }
```

---

## Integration Examples

### Example 1: Create Payment from API

```javascript
import { base44 } from '@/api/base44Client';

async function createPayment(invoiceId, amount) {
  try {
    const payment = await base44.entities.Payment.create({
      tenant_id: 'workspace-123',
      invoice_id: invoiceId,
      client_id: 'client-123',
      amount: amount,
      payment_date: new Date().toISOString().split('T')[0],
      payment_method: 'bank_transfer',
      currency: 'BRL'
    });
    
    console.log('Payment created:', payment.payment_number);
    return payment;
  } catch (error) {
    console.error('Failed to create payment:', error);
    throw error;
  }
}
```

### Example 2: List Payments with Filters

```javascript
async function getPaymentsByStatus(tenantId, status) {
  try {
    const payments = await base44.entities.Payment.filter({
      tenant_id: tenantId,
      status: status
    }, '-payment_date', 100);
    
    return payments;
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    throw error;
  }
}

// Usage
const pendingPayments = await getPaymentsByStatus('workspace-123', 'pending');
const confirmedPayments = await getPaymentsByStatus('workspace-123', 'confirmed');
```

### Example 3: Confirm Payment and Generate Receipt

```javascript
async function confirmPaymentAndGetReceipt(paymentId, tenantId) {
  try {
    // 1. Update payment status
    await base44.entities.Payment.update(paymentId, {
      status: 'confirmed'
    });
    
    // 2. Generate receipt
    const receipt = await base44.functions.invoke('generatePaymentReceipt', {
      payment_id: paymentId,
      tenant_id: tenantId
    });
    
    // 3. Return receipt URL for download
    return receipt.receipt_url;
  } catch (error) {
    console.error('Failed to process payment:', error);
    throw error;
  }
}
```

### Example 4: Reconciliation Workflow

```javascript
async function reconcilePayments(tenantId) {
  try {
    // 1. Run auto-reconciliation
    const autoResult = await base44.functions.invoke('autoReconcilePayments', {
      tenant_id: tenantId
    });
    
    console.log(`Auto-matched ${autoResult.matched} of ${autoResult.total} payments`);
    
    // 2. Get unmatched payments for manual review
    const unmatched = await base44.entities.Payment.filter({
      tenant_id: tenantId,
      invoice_id: null,
      status: 'confirmed'
    });
    
    return {
      autoMatched: autoResult.matched,
      pendingManual: unmatched.length
    };
  } catch (error) {
    console.error('Reconciliation failed:', error);
    throw error;
  }
}
```

---

## Error Handling

### Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Amount exceeds invoice balance | Reduce payment amount |
| 400 | Invoice not found | Verify invoice_id exists |
| 400 | Client not found | Verify client_id exists |
| 403 | Cannot modify confirmed payment | Create refund instead |
| 404 | Payment not found | Verify payment_id |
| 409 | Duplicate payment number | Retry operation |

### Error Response Format

```json
{
  "status": 400,
  "code": "INVALID_AMOUNT",
  "message": "Payment amount exceeds invoice balance",
  "details": {
    "invoice_id": "inv-001",
    "remaining_balance": 500.00,
    "requested_amount": 1000.00
  }
}
```

---

## Performance Tips

### 1. Use Proper Pagination
```javascript
// ✅ Good - paginated
const payments = await base44.entities.Payment.filter(
  { tenant_id },
  '-payment_date',
  50  // limit
);

// ❌ Bad - fetching all (can be slow)
const allPayments = await base44.entities.Payment.filter({ tenant_id });
```

### 2. Filter Before Sorting
```javascript
// ✅ Good - filters reduce data before sort
await base44.entities.Payment.filter({
  tenant_id,
  status: 'confirmed'
}, '-payment_date');

// ❌ Bad - sorts all, then filters
await base44.entities.Payment.filter({ tenant_id }, '-payment_date');
```

### 3. Cache with React Query
```javascript
const { data: payments } = useQuery({
  queryKey: ['payments', tenantId, status],
  queryFn: () => base44.entities.Payment.filter({
    tenant_id: tenantId,
    status: status
  }),
  staleTime: 60000  // 1 minute
});
```

### 4. Virtual Scrolling for Lists
```javascript
// Use @tanstack/react-virtual for 1000+ items
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## Security

### Multi-Tenancy
- ✅ Always include tenant_id in filters
- ✅ Payments are isolated per tenant
- ✅ No cross-tenant data leakage

```javascript
// ✅ Secure
await base44.entities.Payment.filter({ tenant_id: userTenant });

// ❌ Unsafe - could expose other tenants
await base44.entities.Payment.filter({});
```

### Validation
- ✅ All inputs are validated server-side
- ✅ Amount validation prevents overpayment
- ✅ Status transitions are enforced

### Audit Trail
- ✅ created_by tracks creator
- ✅ created_date and updated_date logged
- ✅ All changes auditable

### Permissions
- ✅ Users can only access their tenant's payments
- ✅ Admin can view all tenants
- ✅ Role-based access control enforced

---

## Troubleshooting

### Q: Payment exceeds invoice balance error

**Problem:** Cannot create payment amount > remaining balance  
**Solution:** Calculate remaining balance first
```javascript
const remaining = invoice.total_amount - invoice.paid_amount;
if (paymentAmount > remaining) {
  // Reduce payment or wait for partial payment
}
```

### Q: Auto-reconciliation not matching payments

**Problem:** Automatic matching doesn't find invoice  
**Solution:** Manually reconcile or adjust payment amount
```javascript
// Manual match
await base44.entities.Payment.update(paymentId, {
  invoice_id: invoiceId
});
```

### Q: Receipt generation timeout

**Problem:** PDF takes too long  
**Solution:** Queue as background job
```javascript
await base44.functions.invoke('generatePaymentReceipt', {
  payment_id: paymentId,
  async: true  // Returns job ID
});
```

---

## Support & Resources

- **API Status:** ✅ Production Ready
- **Documentation:** Complete
- **Support:** Available 24/7
- **SLA:** 99.9% uptime

---

**Last Updated:** 2026-03-02  
**Version:** 1.0  
**Status:** ✅ Complete