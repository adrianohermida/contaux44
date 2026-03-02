# 📚 QUOTE ENTITY - API DOCUMENTATION

**Last Updated:** 03/03/2026  
**Sprint:** 17 - Quote Implementation  
**Status:** ✅ Complete - Production Ready  
**Version:** 1.0.0

---

## 📋 TABLE OF CONTENTS

1. [Entity Overview](#entity-overview)
2. [Schema Definition](#schema-definition)
3. [API Endpoints](#api-endpoints)
4. [CRUD Operations](#crud-operations)
5. [Workflows](#workflows)
6. [Integration Points](#integration-points)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 ENTITY OVERVIEW

### Purpose
The Quote entity manages sales quotes for clients. It supports creating, editing, and converting quotes to invoices with automatic calculations, multi-currency support, and discount/tax handling.

### Key Features
- ✅ Automatic quote number generation (QT-XXXX format)
- ✅ Line items with dynamic add/remove
- ✅ Auto-calculated totals (subtotal, discount, tax, total)
- ✅ Multi-currency support (BRL, USD, EUR, GBP, CAD, AUD)
- ✅ Status workflow (draft → sent → accepted → converted/rejected/expired)
- ✅ PDF generation
- ✅ Quote-to-Invoice conversion
- ✅ Multi-tenancy support
- ✅ Full CRUD operations

---

## 📐 SCHEMA DEFINITION

### Quote Entity Structure

```json
{
  "name": "Quote",
  "type": "object",
  "properties": {
    "tenant_id": {
      "type": "string",
      "description": "Tenant/Organization ID (REQUIRED)"
    },
    "quote_number": {
      "type": "string",
      "description": "Unique quote reference (AUTO-GENERATED: QT-XXXX)"
    },
    "client_id": {
      "type": "string",
      "description": "Client entity reference (REQUIRED)"
    },
    "opportunity_id": {
      "type": "string",
      "description": "SalesOpportunity reference (OPTIONAL)"
    },
    "quote_date": {
      "type": "string",
      "format": "date",
      "description": "Quote creation date (REQUIRED)"
    },
    "valid_until": {
      "type": "string",
      "format": "date",
      "description": "Quote expiration date (REQUIRED)"
    },
    "currency": {
      "type": "string",
      "enum": ["BRL", "USD", "EUR", "GBP", "CAD", "AUD"],
      "default": "BRL",
      "description": "Quote currency"
    },
    "items": {
      "type": "array",
      "items": {
        "properties": {
          "id": "string (unique within quote)",
          "product_id": "string (optional)",
          "description": "string (REQUIRED)",
          "quantity": "number >= 1 (REQUIRED)",
          "unit_price": "number >= 0 (REQUIRED)",
          "subtotal": "number (AUTO-CALCULATED)"
        }
      },
      "description": "Quote line items"
    },
    "subtotal": {
      "type": "number",
      "description": "Sum of all items (AUTO-CALCULATED)"
    },
    "discount_percent": {
      "type": "number",
      "default": 0,
      "description": "Discount percentage (0-100)"
    },
    "discount_amount": {
      "type": "number",
      "default": 0,
      "description": "Discount amount in currency (AUTO-CALCULATED)"
    },
    "tax_percent": {
      "type": "number",
      "default": 0,
      "description": "Tax percentage (0-100)"
    },
    "tax_amount": {
      "type": "number",
      "default": 0,
      "description": "Tax amount in currency (AUTO-CALCULATED)"
    },
    "total_amount": {
      "type": "number",
      "description": "Final total (AUTO-CALCULATED)"
    },
    "status": {
      "type": "string",
      "enum": ["draft", "sent", "accepted", "rejected", "converted", "expired"],
      "default": "draft",
      "description": "Quote status"
    },
    "notes": {
      "type": "string",
      "description": "Internal notes"
    },
    "terms": {
      "type": "string",
      "description": "Terms and conditions"
    },
    "invoice_id": {
      "type": "string",
      "description": "Reference to Invoice if converted"
    }
  },
  "required": ["tenant_id", "client_id", "quote_date", "valid_until"]
}
```

### Built-in Fields
- `id`: Unique quote identifier
- `created_date`: Timestamp of creation
- `updated_date`: Timestamp of last update
- `created_by`: Email of user who created

---

## 🔌 API ENDPOINTS

### Base URL
```
https://api.base44.app/entities/Quote
```

### Available Operations
- `POST /create` - Create new quote
- `GET /filter` - Filter/list quotes
- `GET /get/:id` - Retrieve single quote
- `PUT /update/:id` - Update quote
- `DELETE /delete/:id` - Delete quote

---

## 📝 CRUD OPERATIONS

### CREATE - New Quote

```typescript
// Create quote
const quote = await base44.entities.Quote.create({
  tenant_id: "tenant_1",
  client_id: "cli_1",
  quote_date: "2026-03-02",
  valid_until: "2026-04-02",
  currency: "BRL",
  items: [
    {
      description: "Product A",
      quantity: 2,
      unit_price: 100,
      subtotal: 200  // Auto-calculated
    }
  ],
  subtotal: 200,  // Auto-calculated
  discount_percent: 10,
  discount_amount: 20,  // Auto-calculated
  tax_percent: 15,
  tax_amount: 27,  // Auto-calculated
  total_amount: 207,  // Auto-calculated
  status: "draft",
  notes: "Initial quote",
  terms: "Net 30 days"
});

// Response
{
  id: "quote_1",
  quote_number: "QT-0001",
  tenant_id: "tenant_1",
  client_id: "cli_1",
  created_date: "2026-03-02T10:00:00Z",
  created_by: "user@example.com",
  ...
}
```

### READ - Retrieve Quotes

```typescript
// Get single quote
const quote = await base44.entities.Quote.filter({
  id: "quote_1",
  tenant_id: "tenant_1"
});

// Filter by status
const draftQuotes = await base44.entities.Quote.filter({
  tenant_id: "tenant_1",
  status: "draft"
}, "-created_date", 100);

// Filter by client
const clientQuotes = await base44.entities.Quote.filter({
  tenant_id: "tenant_1",
  client_id: "cli_1"
});

// List all with sorting
const allQuotes = await base44.entities.Quote.filter(
  { tenant_id: "tenant_1" },
  "-quote_date",  // Sort descending by date
  50  // Limit to 50 results
);
```

### UPDATE - Modify Quote

```typescript
// Update status
const updated = await base44.entities.Quote.update("quote_1", {
  status: "sent"
});

// Update items and recalculate
const updated = await base44.entities.Quote.update("quote_1", {
  items: [
    { description: "Product B", quantity: 3, unit_price: 150, subtotal: 450 }
  ],
  subtotal: 450,
  discount_percent: 15,
  discount_amount: 67.5,
  tax_percent: 15,
  tax_amount: 57.375,
  total_amount: 439.875
});

// Update terms
const updated = await base44.entities.Quote.update("quote_1", {
  terms: "Net 45 days, 2% discount if paid in 10 days"
});

// Convert to invoice
const converted = await base44.entities.Quote.update("quote_1", {
  status: "converted",
  invoice_id: "invoice_1"
});
```

### DELETE - Remove Quote

```typescript
// Delete (only available for draft quotes)
const deleted = await base44.entities.Quote.delete("quote_1");

// Only draft quotes can be deleted
// Other statuses must be rejected or archived
```

---

## 🔄 WORKFLOWS

### Workflow 1: Basic Quote Lifecycle

```
DRAFT → SENT → ACCEPTED → CONVERTED
  ↓                ↓
DRAFT ────────→ REJECTED
               EXPIRED
```

### Workflow 2: Create → Generate PDF → Send

```typescript
// 1. Create quote
const quote = await base44.entities.Quote.create({...});

// 2. Generate PDF
const pdf = await base44.functions.invoke('generateQuotePDF', {
  quote_id: quote.id,
  tenant_id: quote.tenant_id
});
// Returns: { success: true, file_url: "..." }

// 3. Update status
await base44.entities.Quote.update(quote.id, {
  status: "sent"
});

// 4. Email/Download PDF
window.open(pdf.file_url);
```

### Workflow 3: Accept → Convert to Invoice

```typescript
// 1. Accept quote
await base44.entities.Quote.update(quote.id, {
  status: "accepted"
});

// 2. Convert to invoice
const result = await base44.functions.invoke('convertQuoteToInvoice', {
  quote_id: quote.id,
  tenant_id: quote.tenant_id
});
// Returns: { invoice_id: "inv_1", invoice_number: "INV-0001" }

// Quote automatically updated with:
// - status: "converted"
// - invoice_id: "inv_1"
```

### Workflow 4: Validate & Save

```typescript
// Server-side validation
const validation = await base44.functions.invoke('validateQuoteData', {
  quote_data: quoteData,
  tenant_id: tenant_id
});

if (!validation.valid) {
  console.error(validation.errors);
  // Display errors to user
  return;
}

// Safe to create/update
const quote = await base44.entities.Quote.create(quoteData);
```

---

## 🔗 INTEGRATION POINTS

### Integrations with Other Entities

#### 1. Client Integration
```typescript
// Get client for quote
const clients = await base44.entities.Client.filter({
  id: quote.client_id,
  tenant_id: quote.tenant_id
});

const clientInfo = {
  name: clients[0].company_name,
  email: clients[0].email,
  phone: clients[0].phone,
  address: clients[0].endereco
};
```

#### 2. Invoice Integration
```typescript
// Create invoice from quote
const invoice = await base44.entities.Invoice.create({
  tenant_id: quote.tenant_id,
  client_id: quote.client_id,
  items: quote.items,
  total_amount: quote.total_amount,
  // ... other invoice fields
});

// Update quote reference
await base44.entities.Quote.update(quote.id, {
  invoice_id: invoice.id,
  status: "converted"
});
```

#### 3. SalesOpportunity Integration
```typescript
// Link quote to opportunity
const quote = await base44.entities.Quote.create({
  tenant_id: tenant_id,
  client_id: opportunity.contact_id,
  opportunity_id: opportunity.id,
  deal_value: quote.total_amount,
  // ...
});

// Update opportunity when quote accepted
await base44.entities.SalesOpportunity.update(opportunity.id, {
  pipeline_stage: "proposal",
  last_activity_date: new Date().toISOString().split('T')[0]
});
```

### Backend Functions

#### generateQuotePDF
```typescript
const result = await base44.functions.invoke('generateQuotePDF', {
  quote_id: "quote_1",
  tenant_id: "tenant_1"
});
// Returns: { success: true, file_url: "..." }
```

#### convertQuoteToInvoice
```typescript
const result = await base44.functions.invoke('convertQuoteToInvoice', {
  quote_id: "quote_1",
  tenant_id: "tenant_1"
});
// Returns: { success: true, invoice_id: "inv_1" }
```

#### validateQuoteData
```typescript
const result = await base44.functions.invoke('validateQuoteData', {
  quote_data: {...},
  tenant_id: "tenant_1"
});
// Returns: { valid: true, errors: [] }
```

---

## ⚠️ ERROR HANDLING

### Common Errors

```typescript
// Error: Invalid client
{
  error: "Client not found",
  status: 404
}

// Error: Invalid dates
{
  error: "valid_until must be after quote_date",
  status: 400
}

// Error: Missing items
{
  error: "At least one item is required",
  status: 400
}

// Error: Invalid discount/tax
{
  error: "discount_percent must be between 0 and 100",
  status: 400
}

// Error: Multi-tenancy violation
{
  error: "Unauthorized: tenant mismatch",
  status: 403
}
```

### Error Handling Pattern

```typescript
try {
  const quote = await base44.entities.Quote.create({...});
} catch (error) {
  if (error.status === 400) {
    // Validation error
    console.error("Invalid data:", error.message);
  } else if (error.status === 403) {
    // Authorization error
    console.error("Access denied:", error.message);
  } else if (error.status === 404) {
    // Not found
    console.error("Resource not found:", error.message);
  } else {
    // Server error
    console.error("Server error:", error.message);
  }
}
```

---

## 🏆 BEST PRACTICES

### 1. Always Validate Before Create/Update
```typescript
// ✅ GOOD
const validation = await base44.functions.invoke('validateQuoteData', {
  quote_data: data,
  tenant_id: tenant_id
});

if (validation.valid) {
  await base44.entities.Quote.create(data);
}

// ❌ BAD
await base44.entities.Quote.create(data);  // No validation
```

### 2. Use Tenant ID Consistently
```typescript
// ✅ GOOD
const quote = await base44.entities.Quote.filter({
  tenant_id: userTenantId,
  id: quoteId
});

// ❌ BAD
const quote = await base44.entities.Quote.filter({
  id: quoteId  // Missing tenant_id
});
```

### 3. Calculate Totals Server-Side
```typescript
// ✅ GOOD (calculations server-validated)
const quote = await base44.functions.invoke('validateQuoteData', {
  quote_data: {
    subtotal: 1000,
    discount_percent: 10,
    tax_percent: 15,
    // Server validates: discount_amount, tax_amount, total_amount
  }
});

// ❌ BAD (trusting client calculations)
const quote = await base44.entities.Quote.create({
  subtotal: 1000,
  total_amount: calculatedClientSide  // Unvalidated
});
```

### 4. Handle Status Transitions Carefully
```typescript
// ✅ GOOD
const validTransitions = {
  draft: ['sent', 'deleted'],
  sent: ['accepted', 'rejected'],
  accepted: ['converted'],
  // ...
};

// ❌ BAD
await base44.entities.Quote.update(quote.id, {
  status: 'converted'  // Invalid transition from 'draft'
});
```

### 5. Cache Client and Opportunity Data
```typescript
// ✅ GOOD - Use React Query cache
const { data: clients } = useQuery({
  queryKey: ['clients', tenantId],
  queryFn: () => base44.entities.Client.filter({...})
});

// ❌ BAD - Multiple API calls
quotes.forEach(quote => {
  const client = await base44.entities.Client.filter({...});
});
```

---

## 🔧 TROUBLESHOOTING

### Issue: Quote number not auto-generating
**Cause:** Quote number generation is server-side  
**Solution:** Verify server-side implementation is running

### Issue: Totals not calculating correctly
**Cause:** Client-side calculations don't match server validation  
**Solution:** Use server validation function before save

### Issue: Cannot update quote to 'converted' status
**Cause:** Quote must be 'accepted' first  
**Solution:** Follow proper workflow: draft → sent → accepted → converted

### Issue: Client not found error
**Cause:** Client ID invalid or belongs to different tenant  
**Solution:** Verify client_id and tenant_id match

### Issue: PDF generation timeout
**Cause:** Large quote with many items  
**Solution:** Optimize item rendering or implement pagination

### Issue: Multi-tenancy violation error
**Cause:** Tenant ID mismatch in request  
**Solution:** Verify tenant_id matches authenticated user's workspace

---

## 📊 PERFORMANCE TIPS

1. **Virtual Scrolling**: Use in QuoteList for 1000+ items
2. **Query Caching**: React Query caches for 60 seconds
3. **Lazy Loading**: Load items on demand
4. **Pagination**: Use limit/offset for large datasets
5. **Indexing**: Ensure tenant_id and status are indexed

---

## 📞 SUPPORT & CONTACT

For issues or questions:
- Check this documentation
- Review error messages carefully
- Check sprint documentation
- Contact development team

---

**Documentation Version:** 1.0.0  
**Last Updated:** 03/03/2026  
**Status:** ✅ Production Ready