# Client Entity - API Documentation

## Overview
Complete API reference for the Client entity in the CRM system.

## Entity Schema

### Fields
```typescript
// Required
tenant_id: string          // Multi-tenancy workspace ID
company_name: string       // Min 2 characters
email: string             // Valid email format
client_type: 'pf' | 'pj'  // Default: 'pj'

// Optional but Important
cpf: string               // For PF only (XXX.XXX.XXX-XX)
cnpj: string              // For PJ only (XX.XXX.XXX/XXXX-XX)
phone: string
cep: string               // CEP format (XXXXX-XXX)
endereco: string          // Street address
numero: string            // Number
complemento: string       // Apt, suite, etc
bairro: string            // Neighborhood
cidade: string            // City
uf: string                // State (2 chars)

// Business Fields
currency: 'BRL' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'
status: 'active' | 'inactive' | 'suspended' | 'cancelled'
fiscal_year_start: ISO8601

// Auto-generated
id: string
created_date: ISO8601
updated_date: ISO8601
created_by: email
```

## Operations

### CREATE
```typescript
const client = await base44.entities.Client.create({
  tenant_id: 'ws-123',
  company_name: 'Acme Corp',
  email: 'contact@acme.com',
  client_type: 'pj',
  cnpj: '12.345.678/0001-99'
});
```

**Validations:**
- Email: Regex + existence check
- CNPJ/CPF: Format + uniqueness per tenant
- Required fields enforced

### READ
```typescript
const client = await base44.entities.Client.get('client-id');
```

### LIST
```typescript
// All clients
const all = await base44.entities.Client.list();

// Filtered
const active = await base44.entities.Client.filter({
  tenant_id: 'ws-123',
  status: 'active'
});

// Paginated
const page = await base44.entities.Client.list({
  skip: 20,
  limit: 10
});
```

### UPDATE
```typescript
const updated = await base44.entities.Client.update('client-id', {
  email: 'new@acme.com',
  status: 'inactive'
});
```

### DELETE
```typescript
await base44.entities.Client.delete('client-id');
```

## Validation Functions

### Document Validation
```typescript
const result = await base44.functions.invoke('validateClientDocument', {
  document: '12.345.678/0001-99',
  type: 'cnpj',
  tenantId: 'ws-123',
  excludeClientId: 'client-id' // optional
});
// Returns: { valid: true, message: 'Valid document' }
```

### CEP Lookup
```typescript
const address = await fetchAddress('01310-100');
// Returns: { endereco, bairro, cidade, uf }
```

## Frontend Components

### ClientForm
```tsx
<ClientForm 
  client={undefined}        // undefined for create
  onSave={handleSave}
  onCancel={handleCancel}
  tenantId={workspaceId}
  isOpen={true}
/>
```

**Features:**
- Auto-formatting CPF/CNPJ
- CEP address lookup
- Conditional PF/PJ fields
- Real-time validation
- Audit logging

### ClientList
```tsx
<ClientList 
  onEdit={handleEdit}
  tenantId={workspaceId}
/>
```

**Features:**
- Virtual scrolling
- Mobile/desktop layouts
- CRUD actions
- Loading states

### Clients Page
```tsx
<Clients />
```

**Features:**
- Full management interface
- Search, filter, sort
- Pagination
- Bulk actions
- Import/export

## Performance

### Caching
- Stale time: 5 minutes
- GC time: 15 minutes
- Auto-invalidation on mutations

### Virtualization
- Desktop: React Virtual table
- Mobile: Scrollable cards
- Overscan: 5 items

### Search
- Debounced 300ms
- Client-side filtering
- Full-text capable

## Error Handling

**Validation Errors**
```json
{
  "code": "VALIDATION_ERROR",
  "field": "email",
  "message": "Invalid email format"
}
```

**Duplicate Document**
```json
{
  "code": "DUPLICATE_ERROR",
  "field": "cnpj",
  "message": "CNPJ already exists"
}
```

**Authorization**
```json
{
  "code": "AUTHORIZATION_ERROR",
  "message": "Access denied",
  "status": 403
}
```

## Security

- ✅ Multi-tenancy isolation
- ✅ Input validation
- ✅ Document uniqueness check
- ✅ CSRF protection
- ✅ XSS prevention

## Accessibility

- ✅ WCAG 2.1 AA
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Dark mode

## Testing

### Unit Tests
- ClientForm.test.js (8 tests)
- ClientList.test.js (10 tests)

### E2E Tests
- client-crud.e2e.js (18 scenarios)
  - CREATE, READ, UPDATE, DELETE
  - Search, filter, pagination
  - Accessibility, performance

## Examples

### Create PJ Client
```typescript
const newClient = await base44.entities.Client.create({
  tenant_id: 'workspace-1',
  company_name: 'Empresa XYZ',
  email: 'contato@xyz.com',
  client_type: 'pj',
  cnpj: '12.345.678/0001-99',
  phone: '11 99999-9999',
  currency: 'BRL',
  status: 'active'
});
```

### Search Active Clients
```typescript
const active = await base44.entities.Client.filter({
  tenant_id: 'workspace-1',
  status: 'active'
});

const results = active.filter(c =>
  c.company_name.toLowerCase().includes('xyz')
);
```

### Update Client
```typescript
const updated = await base44.entities.Client.update('client-123', {
  email: 'newemail@xyz.com',
  phone: '11 98888-8888',
  status: 'inactive'
});
```

### Delete Client
```typescript
// Soft delete (recommended)
await base44.entities.Client.update('client-123', {
  status: 'cancelled'
});

// Hard delete (permanent)
await base44.entities.Client.delete('client-123');
```

## Best Practices

1. **Always filter by tenant_id** for multi-tenancy safety
2. **Validate documents** before storing to catch duplicates
3. **Use React Query** for automatic caching and invalidation
4. **Implement soft deletes** (status: cancelled) instead of hard deletes
5. **Cache aggressively** with staleTime: 5 minutes
6. **Search client-side** after fetching for better UX
7. **Paginate large lists** (20-50 items per page)
8. **Use virtualization** for performance with many items

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-02 | Initial release |