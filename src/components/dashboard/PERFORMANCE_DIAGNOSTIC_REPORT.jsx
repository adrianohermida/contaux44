# 🔍 RAIO-X ESTRUTURAL DE PERFORMANCE - DASHBOARD CONTAUX
**Data:** 20/02/2026  
**Status:** 🔴 CRÍTICO - Carregamento Lentíssimo Identificado

---

## 📊 DIAGNÓSTICO GERAL

### 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

#### 1. **CASCATA DE AUTENTICAÇÃO (WATERFALL)**
**Severidade:** 🔴 CRÍTICA  
**Impacto:** +2-3 segundos por página

```
Layout.js → AuthProvider → useAuth
  ↓
DashboardLayout → ProtectedInternalRoute → useMultitenantAuth
  ↓
Cada Página → useMultitenantAuthOptimized
  ↓
React Query (staleTime: 5min) → AINDA ASSIM FAZ CHAMADAS REPETIDAS
```

**Problema:** Múltiplos níveis de validação de autenticação em sequência, causando blocking waterfall.

---

#### 2. **REACT QUERY MAL CONFIGURADO**
**Severidade:** 🔴 CRÍTICA  
**Impacto:** Queries desnecessárias, cache ineficiente

**Arquivo:** `useMultitenantAuthOptimized.js`
```javascript
// ❌ PROBLEMA: Query sempre enabled quando user existe
const { data: user, isLoading } = useQuery({
  queryKey: ['multitenant-auth', requiredType],
  enabled: !contextLoading && !!contextUser, // ← FAZ QUERY SEMPRE!
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
});
```

**Causa:** O user já vem do AuthContext, não precisa fazer query adicional.

---

#### 3. **DASHBOARD: MÚLTIPLAS QUERIES PARALELAS SEM CONTROLE**
**Severidade:** 🟡 ALTA  
**Impacto:** +1-2 segundos

**Arquivo:** `pages/Dashboard.js`
```javascript
// ❌ 5 queries em paralelo no mount:
const [clients, processes, tickets, invoices, quotes] = await Promise.all([...]);
```

**Problema:** 
- Sem loading state incremental
- Todas as queries bloqueiam render
- Sem priorização (dados críticos vs secundários)

---

#### 4. **SIDEBAR: QUERY DESNECESSÁRIA EM TODAS AS PÁGINAS**
**Severidade:** 🟡 ALTA  
**Impacto:** +500ms por navegação

**Arquivo:** `components/dashboard/Sidebar.js`
```javascript
// ❌ Busca mensagens não lidas em TODA navegação
const { data: unreadCount } = useQuery({
  queryKey: ['unread-conversations', workspaceId],
  queryFn: async () => { /* busca conversas */ },
  refetchInterval: 30000, // ← Refetch a cada 30s!
});
```

**Problema:** Query pesada rodando em background constantemente.

---

#### 5. **COMPONENTES DE LISTA SEM VIRTUALIZAÇÃO**
**Severidade:** 🟡 MÉDIA  
**Impacto:** Render de 100+ items DOM

**Arquivos:** 
- `ClientList.js`
- `TicketList.js`
- `InvoiceList.js`
- etc.

**Problema:** Renderiza todos os items de uma vez, sem virtualização.

---

#### 6. **LAZY LOADING SEM PRELOAD**
**Severidade:** 🟢 BAIXA  
**Impacato:** +200-300ms no primeiro acesso

**Arquivo:** `LazyPages.js`
```javascript
// ✅ Lazy load configurado
// ❌ Mas sem preload on hover/intent
export const LazyClients = lazy(() => import('../../pages/Clients'));
```

---

#### 7. **DARK MODE: RE-RENDER EM CASCATA**
**Severidade:** 🟡 MÉDIA  
**Impacto:** Jank visual, +100-200ms

**Arquivo:** `Layout.js`
```javascript
const setupTheme = () => {
  const root = document.documentElement;
  if (saved === 'dark') {
    root.classList.add('dark'); // ← Dispara repaint em toda app
  }
};
```

**Problema:** Manipulação de DOM em runtime causa reflow.

---

## 🎯 MÉTRICAS ESTIMADAS ATUAIS

| Métrica | Valor Atual | Ideal | Status |
|---------|-------------|-------|--------|
| **First Contentful Paint** | ~2.5s | <1s | 🔴 |
| **Time to Interactive** | ~4s | <2s | 🔴 |
| **Largest Contentful Paint** | ~3.5s | <2.5s | 🔴 |
| **Auth Cascade** | 3 níveis | 1 nível | 🔴 |
| **Queries no mount** | 6-8 queries | 1-2 queries | 🔴 |
| **Bundle Size (estimado)** | ~800KB | <500KB | 🟡 |
| **Re-renders desnecessários** | Alto | Baixo | 🟡 |

---

## 🛠️ PLANO DE CORREÇÃO - 4 FASES

### 🚀 **FASE 1: CORREÇÃO CRÍTICA DE AUTH (Ganho: 2-3s)**
**Prioridade:** 🔴 MÁXIMA  
**Tempo estimado:** 2-3 horas

#### Ações:
1. **Remover cascata de auth**
   - ✅ Manter AuthProvider no Layout
   - ❌ REMOVER useMultitenantAuth do DashboardLayout
   - ❌ REMOVER query duplicada do useMultitenantAuthOptimized
   - ✅ Passar user via props ou context direto

2. **Implementar Single Source of Truth**
```javascript
// ✅ SOLUÇÃO: Auth Context centralizado
AuthContext → user, workspaceId, userType (CACHED)
  ↓
Todos os componentes usam useAuth() direto (zero queries)
```

3. **Cache agressivo**
   - Salvar `user` + `workspaceId` no sessionStorage
   - Invalidar APENAS no logout ou refresh explícito

**Impacto:** -2.5s no carregamento inicial

---

### ⚡ **FASE 2: OTIMIZAÇÃO DE QUERIES (Ganho: 1-2s)**
**Prioridade:** 🔴 ALTA  
**Tempo estimado:** 3-4 horas

#### Ações:
1. **Dashboard: Queries progressivas**
```javascript
// ✅ Priorização:
// 1º - Dados críticos (Stats principais)
// 2º - Dados secundários (Gráficos)
// 3º - Dados complementares (Atividades)

// Carregar em cascata controlada:
useQuery(['dashboard-critical'], ..., { priority: 1 })
useQuery(['dashboard-secondary'], ..., { 
  enabled: !!criticalData, 
  priority: 2 
})
```

2. **Sidebar: Lazy query de unread**
```javascript
// ❌ Remover refetchInterval: 30000
// ✅ Usar WebSocket ou polling manual
// ✅ Query APENAS quando sidebar aberta
```

3. **Configurar React Query Devtools**
   - Identificar queries lentas
   - Ajustar staleTime/gcTime por tipo de dado

**Impacto:** -1.5s no carregamento, -70% de queries desnecessárias

---

### 🎨 **FASE 3: OTIMIZAÇÃO DE RENDERS (Ganho: 500-800ms)**
**Prioridade:** 🟡 MÉDIA  
**Tempo estimado:** 4-5 horas

#### Ações:
1. **Virtualização de listas**
   - Instalar: `@tanstack/react-virtual` (já usam react-query)
   - Implementar em: ClientList, TicketList, InvoiceList

2. **Memoização estratégica**
```javascript
// ✅ Memo em componentes puros
const StatCard = memo(({ icon, title, value }) => { ... });

// ✅ useMemo para cálculos pesados
const sortedItems = useMemo(() => 
  items.sort(...), 
  [items]
);

// ✅ useCallback para event handlers passados via props
const handleEdit = useCallback((item) => { ... }, [deps]);
```

3. **Lazy load de componentes pesados**
```javascript
// ✅ Lazy load de Charts, Editors, etc
const LazyChart = lazy(() => import('./Chart'));
```

4. **Dark Mode: CSS Variables**
```javascript
// ❌ Remover manipulação de classList em runtime
// ✅ Usar CSS variables + transition suave
<html data-theme="dark">
```

**Impacto:** -700ms no render, UI mais fluida

---

### 🚀 **FASE 4: CODE SPLITTING E PRELOAD (Ganho: 300-500ms)**
**Prioridade:** 🟢 BAIXA  
**Tempo estimado:** 2-3 horas

#### Ações:
1. **Preload on hover**
```javascript
// ✅ Precarregar página ao hover no link
<Link 
  to="/clients"
  onMouseEnter={() => import('../../pages/Clients')}
>
```

2. **Route-based code splitting**
   - Já implementado ✅
   - Melhorar chunks: bundle por módulo (CRM, Finance, etc)

3. **Prefetch de dados críticos**
```javascript
// ✅ Prefetch workspace data no login
queryClient.prefetchQuery(['workspace', workspaceId]);
```

**Impacto:** -400ms na navegação entre páginas

---

## 📈 GANHOS ESPERADOS APÓS IMPLEMENTAÇÃO

| Fase | Tempo Implementação | Ganho de Performance | Status |
|------|---------------------|----------------------|--------|
| Fase 1 - Auth | 2-3h | -2.5s (50%) | ⏳ Pendente |
| Fase 2 - Queries | 3-4h | -1.5s (30%) | ⏳ Pendente |
| Fase 3 - Renders | 4-5h | -0.7s (15%) | ⏳ Pendente |
| Fase 4 - Preload | 2-3h | -0.4s (5%) | ⏳ Pendente |
| **TOTAL** | **11-15h** | **-5.1s (100%)** | ⏳ |

### Métricas Projetadas Pós-Correção:
| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **First Contentful Paint** | 2.5s | 0.8s | 68% ⬇️ |
| **Time to Interactive** | 4s | 1.5s | 62% ⬇️ |
| **Auth Cascade** | 3 níveis | 0 níveis | 100% ⬇️ |
| **Queries no mount** | 6-8 | 2-3 | 60% ⬇️ |

---

## 🎯 RECOMENDAÇÕES IMEDIATAS

### ✅ Quick Wins (Implementar HOJE):
1. **Remover query duplicada do useMultitenantAuthOptimized**
   - Tempo: 15 min
   - Ganho: -500ms

2. **Desabilitar refetchInterval da Sidebar**
   - Tempo: 5 min
   - Ganho: -200ms

3. **Adicionar memo nos StatCards**
   - Tempo: 10 min
   - Ganho: -100ms

**Total Quick Wins: 30 min = -800ms ⚡**

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1 - Auth Crítica
- [ ] Criar novo hook `useAuthOptimized` sem queries
- [ ] Atualizar AuthContext com workspaceId
- [ ] Remover useMultitenantAuth do DashboardLayout
- [ ] Atualizar todas as páginas para usar novo hook
- [ ] Testar fluxo de login/logout
- [ ] Validar performance (esperado: -2.5s)

### Fase 2 - Queries
- [ ] Implementar queries progressivas no Dashboard
- [ ] Remover refetchInterval da Sidebar
- [ ] Configurar priorities no React Query
- [ ] Adicionar staleTime estratégico por tipo
- [ ] Testar queries com React Query Devtools
- [ ] Validar performance (esperado: -1.5s)

### Fase 3 - Renders
- [ ] Instalar @tanstack/react-virtual
- [ ] Implementar virtualização em 5 listas principais
- [ ] Adicionar memo em 10 componentes chave
- [ ] Refatorar Dark Mode para CSS vars
- [ ] Lazy load de Charts e Editors
- [ ] Validar performance (esperado: -700ms)

### Fase 4 - Preload
- [ ] Implementar preload on hover
- [ ] Configurar prefetch de workspace data
- [ ] Otimizar chunks do bundle
- [ ] Validar performance (esperado: -400ms)

---

## 🎬 PRÓXIMOS PASSOS

1. **APROVAR PLANO** ✅
2. **Iniciar Fase 1** (Quick Wins + Auth)
3. **Medir resultados** com Chrome DevTools
4. **Iterar** nas próximas fases

---

## 📞 SUPORTE TÉCNICO

**Questões técnicas:**
- React Query: https://tanstack.com/query/latest
- React Virtual: https://tanstack.com/virtual/latest
- Performance: https://web.dev/vitals/

**Ferramentas de medição:**
- Chrome DevTools → Performance Tab
- React DevTools → Profiler
- Lighthouse → Performance Score

---

**PRONTO PARA IMPLEMENTAÇÃO IMEDIATA** ✅