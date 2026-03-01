# 🚀 SPRINT 2 - CONSOLIDAÇÃO AUTH + CONTACT

**Status:** 🔄 EM EXECUÇÃO  
**Data Início:** 2026-03-01  
**Data Planejada:** 2026-03-07  
**Completude:** 0% → KICKOFF

---

## 📋 TAREFAS DO SPRINT 2

### 1. ✅ Unificar Auth Hooks (4→1) 

**Hooks identificados:**
- `useMultitenantAuth` - com queries
- `useMultitenantAuthOptimized` - zero-query
- `useUserAndTenant` - variação
- `useUserAndTenantOptimized` - variação otimizada

**Plano de unificação:**
- [x] Análise: `useMultitenantAuthOptimized` é superior (zero-query)
- [ ] Remover: `useMultitenantAuth` (redundante, faz query duplicada)
- [ ] Remover: `useUserAndTenant` + `useUserAndTenantOptimized` (deprecated)
- [ ] Criar: `useGlobalAuth` wrapper com exports para compatibilidade
- [ ] Migrar: Todas as importações para novo hook único

**Arquivos a migrar:**
```
grep -r "useMultitenantAuth\|useUserAndTenant" components/ pages/ --include="*.jsx"
```

---

### 2. 🔄 Consolidar Contact/Client Modules

**Atual - Duplicação identificada:**
- `components/dashboard/contact/*` (40+ arquivos)
- `components/dashboard/clients/*` (20+ arquivos)
- `pages/Contact.jsx`
- `pages/Clients.jsx`

**Arquivos duplicados:**
- ContactCreateModal ↔ ClientCreateModal
- ContactForm ↔ ClientForm
- ContactFiltersBar ↔ ClientsFiltersBar
- ContactGrid ↔ ClientsGrid

**Plano de consolidação:**
- [ ] Decidir: Contact (singular) ou Clients (plural) como canonical
- [ ] Mover: lógica comum para `components/contact/` (shared)
- [ ] Criar: `components/contact/ContactForm` (reutilizável)
- [ ] Refatorar: Pages para usar componentes unificados
- [ ] Validar: Entity Client vs ContactSubmission

---

### 3. 🔄 Refatorar Reports.jsx (44 tabs → 3 módulos)

**Problema atual:**
- 44 tabs em UM ÚNICO arquivo
- UX ruim (muitos cliques)
- Performance: carrega tudo de uma vez
- Manutenção: arquivo com 1000+ linhas

**Plano modular:**

**Módulo 1: Analytics (7 tabs)**
```
pages/ReportsAnalytics.jsx
- Dashboard básico
- Predictions (Revenue Forecast)
- Customer Insights
- Comparison
- Charts e Metrics
```

**Módulo 2: Advanced (15 tabs)**
```
pages/ReportsAdvanced.jsx
- AI Report Builder
- Custom Reports
- ML Analytics
- NLP Analysis
- Scheduled Reports
- Export Engine
```

**Módulo 3: Operations (22 tabs)**
```
pages/ReportsOperations.jsx
- Security (MFA, Encryption, Compliance, RBAC)
- Monitoring (Live, Alerts, Advanced Mon)
- Performance & Scaling
- Integration & DevOps
- Database & CDN
```

**Ações:**
- [ ] Criar 3 novos pages com lazy loading
- [ ] Implementar lazy-loaded TabsContent
- [ ] Mover componentes por categoria
- [ ] Implementar sub-navigation entre módulos

---

### 4. 🔄 Implementar Lazy Loading

**Scope:**
- [ ] Lazy load tab content (Reports)
- [ ] Code splitting por rota
- [ ] Suspense boundaries
- [ ] Loading skeletons

---

## 📊 RESUMO DE PROGRESSO

| Tarefa | Status | Dias | % |
|--------|--------|------|---|
| Unificar auth hooks | 🔄 ANÁLISE | 1d | 10% |
| Consolidar Contact/Client | 🔄 PLANEJADO | 2d | 0% |
| Refatorar Reports (44→3) | 🔄 PLANEJADO | 2d | 0% |
| Lazy loading | 🔄 PLANEJADO | 1d | 0% |

**COMPLETUDE SPRINT 2: 0% → INICIANDO**

---

## 🎯 PRÓXIMOS PASSOS (Imediato)

1. [ ] Grep all `useMultitenantAuth` imports
2. [ ] Create unified `useGlobalAuth` hook
3. [ ] Remove old hook variations
4. [ ] Test migration

---

## ✨ SPRINT 3 PREVIEW

**Agendado:** 2026-03-14

- [ ] Entities: Invoice ↔ TaxInvoice reconciliation
- [ ] Unify: Ticket ↔ ChatMessage ↔ VirtualCounterMessage
- [ ] Integrate: Google Calendar sync for Accounting Calendar
- [ ] Add: Entity validation rules

---

**Executor:** Base44 AI Agent | **Atualizado:** 2026-03-01