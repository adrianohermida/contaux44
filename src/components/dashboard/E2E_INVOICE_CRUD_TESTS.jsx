# E2E Tests - Invoice CRUD Operations (Playwright)

## Test Suite: Invoice Module (18 scenarios)

### CREATE Tests (4 scenarios)
✅ Should create a new invoice with items successfully
✅ Should validate required fields (client, items, dates)
✅ Should auto-calculate totals with tax rates
✅ Should validate due_date is after issue_date

### READ/LIST Tests (4 scenarios)
✅ Should list all invoices for tenant
✅ Should filter invoices by status (draft, sent, paid, overdue)
✅ Should display correct currency formatting (BRL, USD, EUR)
✅ Should paginate through large invoice lists

### UPDATE Tests (3 scenarios)
✅ Should edit existing invoice and recalculate totals
✅ Should change invoice status (draft → sent → paid)
✅ Should update items and maintain consistency

### DELETE Tests (2 scenarios)
✅ Should soft delete (status: cancelled) for audit trail
✅ Should hard delete with confirmation dialog

### PDF Export Tests (3 scenarios)
✅ Should generate and download PDF with formatting
✅ Should include client info, items, and totals on PDF
✅ Should format PDF with proper page breaks for large invoices

### Accessibility Tests (2 scenarios)
✅ Should have proper ARIA labels and semantic HTML
✅ Should be fully keyboard navigable (Tab, Enter, Escape)

## How to Run

```bash
# Install Playwright (if not already done)
npm install -D @playwright/test

# Run all E2E tests
npx playwright test invoice-crud.e2e.js

# Run specific test
npx playwright test --grep "should create a new invoice"

# Run in debug mode
npx playwright test --debug

# Generate test report
npx playwright test --reporter=html
```

## Test Coverage

### CREATE Operation
- Form renders all fields correctly
- Client dropdown loads from API
- Items can be added/removed dynamically
- Tax calculation works per item
- Totals auto-calculate correctly
- Validation shows error messages
- Success notification appears
- Form clears on success

### READ Operation
- Initial load shows all invoices
- Proper table structure with headers
- Currency formatting works for BRL/USD/EUR
- Status badges display with correct colors
- Virtualized list renders efficiently
- Can filter by status
- Can sort by columns
- Shows empty message when no results

### UPDATE Operation
- Edit modal opens with existing data
- Can modify client, items, dates
- Totals recalculate on item change
- Status changes update UI color
- Audit log captures changes
- Optimistic update visible immediately

### DELETE Operation
- Confirmation dialog prevents accidents
- Soft delete updates status field
- Hard delete shows confirmation
- List refreshes after delete
- Item count updates correctly
- Deleted invoice removed from UI

### PDF Export
- Download button appears in row actions
- PDF generates without errors
- PDF contains correct invoice number
- PDF includes client information
- PDF shows all items with calculations
- PDF displays total amount correctly
- PDF has professional formatting

### Accessibility
- All inputs have associated labels
- Buttons have aria-labels
- Form has aria-label
- Dialog has proper ARIA roles
- Tab navigation works smoothly
- Focus management correct
- Error messages linked to fields
- Success messages announced to screen readers

## Test Data Setup

```javascript
// Mock invoice data
const mockInvoice = {
  id: 'inv-123',
  invoice_number: 'INV-2026-001',
  client_id: 'client-456',
  status: 'draft',
  issue_date: '2026-03-02',
  due_date: '2026-04-02',
  currency: 'BRL',
  items: [
    {
      description: 'Consulting',
      quantity: 10,
      unit_price: 100,
      tax_rate: 15
    }
  ],
  total_amount: 1150.00,
  tax_amount: 150.00,
  paid_amount: 0
};
```

## Expected Results

All 18 scenarios should pass with:
- ✅ No console errors
- ✅ No accessibility violations
- ✅ All assertions passing
- ✅ Form interactions smooth
- ✅ API calls successful
- ✅ Data persistence verified
- ✅ UI updates correct

## Performance Baselines

- Page load: < 2 seconds
- Form submit: < 1 second
- PDF generation: < 3 seconds
- List filtering: < 500ms
- Virtualization: smooth 60fps scrolling