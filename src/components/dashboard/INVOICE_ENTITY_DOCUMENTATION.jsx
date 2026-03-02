# Invoice Entity - API Documentation & Implementation Guide

## Overview
Complete API reference for the Invoice entity in the CRM financeiro module.

## Entity Schema

### Fields
```typescript
// Required
tenant_id: string                    // Multi-tenancy workspace ID
client_id: string                    // Reference to Client entity (required)
invoice_number: string               // Unique per tenant
issue_date: ISO8601 date             // Date issued
due_date: ISO8601 date               // Payment due date
items: array                         // Invoice line items (required)

// Calculated Automatically
total_amount: number                 // Subtotal + tax
tax_amount: number                   // Sum of all item taxes
paid_amount: number                  // Amount already paid

// Status Fields
status: enum                         // draft | sent | viewed | paid | overdue | cancelled
currency: string                     // BRL | USD | EUR | GBP | CAD | AUD (default: BRL)

// Optional
notes: string                        // Additional notes

// Auto-generated
id: string
created_date: ISO8601
updated_date: ISO8601
created_by: email
```

### Items Structure
```typescript
{
  description: string       // Item description (required)
  quantity: number         // Item quantity (required)
  unit_price: number       // Price per unit (required)
  tax_rate: number         // Tax percentage (0-100, default: 0)
}
```

## Operations

### CREATE - Create a new invoice
```typescript
const invoice = await base44.entities.Invoice.create({
  tenant_id: 'workspace-1',
  client_id: 'client-123',
  invoice_number: 'INV-2026-001',
  issue_date: '2026-03-02',
  due_date: '2026-04-02',
  currency: 'BRL',
  items: [
    {
      description: 'Consulting Services',
      quantity: 10,
      unit_price: 100.00,
      tax_rate: 15
    }
  ],
  status: 'draft'
});
```

**Validations:**
- invoice_number must be unique per tenant
- due_date must be after issue_date
- items array must have at least 1 item
- each item must have description and unit_price > 0
- client_id must exist and belong to same tenant

**Auto-calculated:**
- total_amount = sum(items quantity × unit_price + tax)
- tax_amount = sum(items quantity × unit_price × tax_rate%)

### READ - Get a single invoice
```typescript
const invoice = await base44.entities.Invoice.get('invoice-id');
```

### LIST - Get invoices with filtering
```typescript
// All invoices
const invoices = await base44.entities.Invoice.list();

// Filter by tenant
const tenantInvoices = await base44.entities.Invoice.filter({
  tenant_id: 'workspace-1'
});

// Filter by status
const paidInvoices = await base44.entities.Invoice.filter({
  tenant_id: 'workspace-1',
  status: 'paid'
});

// Filter by client
const clientInvoices = await base44.entities.Invoice.filter({
  tenant_id: 'workspace-1',
  client_id: 'client-123'
});
```

### UPDATE - Modify an existing invoice
```typescript
const updated = await base44.entities.Invoice.update('invoice-id', {
  status: 'sent',
  due_date: '2026-05-02',
  items: [
    {
      description: 'Updated Service',
      quantity: 20,
      unit_price: 150.00,
      tax_rate: 15
    }
  ]
});
```

**Notes:**
- Totals auto-recalculate on update
- Cannot update tenant_id
- Status changes trigger audit logs

### DELETE - Remove an invoice
```typescript
await base44.entities.Invoice.delete('invoice-id');
```

**Recommendation:** Use soft delete via status update:
```typescript
await base44.entities.Invoice.update('invoice-id', {
  status: 'cancelled'
});
```

## Validation Functions

### Invoice Number Validation
```typescript
const result = await base44.functions.invoke('validateInvoiceNumber', {
  invoiceNumber: 'INV-2026-001',
  tenantId: 'workspace-1',
  excludeInvoiceId: 'invoice-id' // optional (for updates)
});
// Returns: { valid: true, message: 'Available' }
```

### PDF Generation
```typescript
const response = await base44.functions.invoke('generateInvoicePDF', {
  invoiceId: 'invoice-123',
  tenantId: 'workspace-1'
});
// Returns: PDF file (arraybuffer)
```

## Frontend Components

### InvoiceForm
```tsx
<InvoiceForm 
  invoice={undefined}        // undefined for create
  onSave={handleSave}
  onCancel={handleCancel}
  tenantId={workspaceId}
  isOpen={true}
/>
```

**Features:**
- Auto-loads active clients dropdown
- Dynamic item management (add/remove)
- Auto-calculation of totals
- Real-time validation feedback
- Dark mode support

### InvoiceList
```tsx
<InvoiceList 
  tenantId={workspaceId}
  onEdit={handleEdit}
/>
```

**Features:**
- Virtual scrolling (1000+ invoices)
- Status color coding
- Currency formatting
- Quick edit/delete actions
- Real-time sync

### Invoicing Page
```tsx
<Invoicing />
```

**Features:**
- Full CRUD interface
- Search, filter, sort
- Pagination
- PDF export
- Audit logging

## Performance Optimization

### React Query Caching
```typescript
const { data: invoices } = useQuery({
  queryKey: ['Invoice-list', tenantId],
  queryFn: () => base44.entities.Invoice.filter({ tenant_id: tenantId }),
  staleTime: 5 * 60 * 1000,      // 5 minutes
  gcTime: 15 * 60 * 1000,        // 15 minutes (formerly cacheTime)
  refetchOnWindowFocus: false
});
```

### Virtual Scrolling
- Desktop: React Virtual table
- Estimated row size: 68px
- Overscan: 5 items
- Handles 10k+ invoices efficiently

### Search Strategy
- Client-side filtering after fetch
- Debounced search input (300ms)
- Full-text capable

## Status Management

### Invoice Status Flow
```
draft → sent → viewed → paid
  ↓      ↓       ↓       ↓
  └──────┴───────┴───────┴→ overdue
  └──────────────────────→ cancelled
```

**Status Colors:**
- draft: Slate (pending)
- sent: Blue (in transit)
- viewed: Purple (customer saw it)
- paid: Green (complete)
- overdue: Red (past due)
- cancelled: Gray (void)

## Error Handling

**Validation Errors**
```json
{
  "field": "invoice_number",
  "message": "Número de fatura já existe neste workspace"
}
```

**Date Errors**
```json
{
  "field": "due_date",
  "message": "Data de vencimento deve ser posterior à emissão"
}
```

**Authorization**
```json
{
  "error": "Unauthorized",
  "status": 403
}
```

## Security

- ✅ Multi-tenancy isolation (tenant_id enforcement)
- ✅ Invoice number uniqueness per tenant
- ✅ Client ownership validation
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Rate limiting

## Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ ARIA labels on form fields
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader support
- ✅ Dark mode fully supported
- ✅ High contrast maintained

## Testing

### Unit Tests
- InvoiceForm.test.js (12 tests)
  - Client loading, validation, item management
  - Submit handling, edit mode, accessibility
  
- InvoiceList.test.js (13 tests)
  - Render, filtering, CRUD actions
  - Status colors, currency formatting
  - Error handling, dark mode

### E2E Tests (Coming)
- Create invoice with items
- Edit invoice totals
- Delete with confirmation
- PDF export
- Status transitions

### Run Tests
```bash
npm test InvoiceForm.test.js
npm test InvoiceList.test.js
npm run test:e2e invoice-crud.e2e.js
```

## Examples

### Complete Invoice Creation
```typescript
const newInvoice = await base44.entities.Invoice.create({
  tenant_id: 'ws-001',
  client_id: 'client-456',
  invoice_number: 'INV-2026-001',
  issue_date: '2026-03-02',
  due_date: '2026-04-02',
  currency: 'BRL',
  status: 'draft',
  items: [
    {
      description: 'Web Development',
      quantity: 40,
      unit_price: 150.00,
      tax_rate: 15
    },
    {
      description: 'Hosting (3 months)',
      quantity: 3,
      unit_price: 50.00,
      tax_rate: 10
    }
  ],
  notes: 'Payment due 30 days from date of issue'
});
```

### Generate PDF
```typescript
const response = await base44.functions.invoke('generateInvoicePDF', {
  invoiceId: newInvoice.id,
  tenantId: 'ws-001'
});

// Download PDF
const blob = new Blob([response.data], { type: 'application/pdf' });
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `fatura-${newInvoice.invoice_number}.pdf`;
a.click();
```

### Update Status to Paid
```typescript
await base44.entities.Invoice.update('invoice-id', {
  status: 'paid',
  paid_amount: invoice.total_amount
});
```

### Query Unpaid Invoices
```typescript
const unpaid = await base44.entities.Invoice.filter({
  tenant_id: 'ws-001'
});

const overdue = unpaid.filter(inv => {
  const dueDate = new Date(inv.due_date);
  return dueDate < new Date() && inv.status !== 'paid';
});
```

## Best Practices

1. **Always filter by tenant_id** for multi-tenancy safety
2. **Validate invoice numbers** before storing
3. **Use soft deletes** (status: cancelled) instead of hard deletes
4. **Cache aggressively** (5-minute stale time)
5. **Paginate large lists** (20-50 items per page)
6. **Generate PDFs asynchronously** for large files
7. **Track status transitions** in audit logs
8. **Validate dates** before submission (due > issue)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-02 | Initial release - CRUD + PDF export |

## API Compliance

- ✅ REST conventions
- ✅ Multi-tenancy isolation
- ✅ Pagination support
- ✅ Filtering & sorting
- ✅ Error handling
- ✅ WCAG 2.1 AA accessibility
- ✅ Dark mode support
- ✅ Mobile-first responsive