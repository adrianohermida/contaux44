# E2E Tests - Client CRUD Operations (Playwright)

## Test Scenarios (18 total)

### CREATE Tests (4)
✅ Should create a new PJ client successfully
✅ Should validate required fields
✅ Should auto-format CNPJ
✅ Should switch between PF and PJ fields

### READ Tests (4)
✅ Should list created clients
✅ Should search clients by name
✅ Should filter by status
✅ Should paginate through clients

### UPDATE Tests (1)
✅ Should edit existing client

### DELETE Tests (2)
✅ Should delete client with confirmation
✅ Should cancel delete when declining confirmation

### Accessibility Tests (3)
✅ Should have proper ARIA labels
✅ Should be keyboard navigable
✅ Should have dark mode support

### Performance Tests (2)
✅ Should load clients list within 3 seconds
✅ Should handle large lists efficiently

## How to Run

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test client-crud.e2e.js

# Run in debug mode
npx playwright test --debug

# Run with UI
npx playwright test --ui
```

## Test Coverage Details

### CREATE Operation
- Form renders all fields correctly
- Validates required fields (company_name, email)
- Auto-formats CNPJ (XX.XXX.XXX/XXXX-XX)
- Auto-formats CPF (XXX.XXX.XXX-XX)
- Switches form fields based on PF/PJ selection
- Shows success message after creation
- Closes modal on successful save

### READ Operation
- Lists all clients in table view
- Shows client information (name, email, phone, type)
- Displays loading state
- Supports search by company name
- Supports filter by status (active/inactive)
- Supports pagination
- Shows empty message when no results

### UPDATE Operation
- Opens edit modal with existing data
- Updates client information
- Re-validates documents
- Shows success message
- Closes modal on successful update

### DELETE Operation
- Shows confirmation dialog
- Deletes on confirmation
- Cancels delete on dismissal
- Refreshes list after deletion
- Updates client count

### Accessibility
- All interactive elements have ARIA labels
- Tab navigation works correctly
- Dialog roles properly defined
- Form labels associated with inputs
- Dark mode toggle works
- High contrast maintained in dark mode

### Performance
- Page loads within 3 seconds
- Large lists virtualized properly
- Minimal re-renders
- Smooth animations
- No jank during scrolling