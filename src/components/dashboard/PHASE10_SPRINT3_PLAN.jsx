# 🚀 FASE 10 - SPRINT 10.3 PLANEJAMENTO
**Status**: PRONTO PARA EXECUÇÃO  
**Data Início**: 2026-02-21  
**Estimativa**: 3 horas

---

## 🎯 OBJETIVO SPRINT 10.3
Adicionar capacidades de IA para recomendações automáticas, análise preditiva e sugestões de enriquecimento de dados.

---

## 📋 BACKLOG SPRINT 10.3

### Feature 1: AI Insights Widget (1.5h)
**Arquivo**: `components/dashboard/widgets/AIInsightsWidget.jsx`

**Funcionalidades**:
- Exibir recomendações acionáveis via IA
- Card por recomendação com:
  - Ícone de tipo (contact, follow-up, proposal, etc)
  - Lead name
  - Reason explanation
  - Action button
  - Priority score (1-5 stars)
  - Due date
- Filter by priority
- Mark as done
- Sort by due date/priority

**Dados Necessários**:
- Query SalesOpportunity (todas)
- Query ContactActivity
- Call recommendNextActions function

**Visual**:
- Card-based layout
- Icon + color coding por tipo
- Priority stars
- Action buttons (Contact Now, Schedule, Send Proposal)

---

### Feature 2: Recommend Next Actions Function (1h)
**Arquivo**: `functions/recommendNextActions.js`

**Algoritmo**:
1. Analisa padrões de leads bem-sucedidos
2. Para cada lead, recomenda:
   - Next contact action (call, email, meeting)
   - Timing (urgent, this week, next week)
   - Reason (inactivity, score drop, timing, etc)
   - Suggested message/content

**Inputs**:
- workspace_id
- Opcional: opportunity_id (single) ou all

**Outputs**:
```javascript
{
  recommendations: [
    {
      opportunity_id: "...",
      lead_name: "...",
      action_type: "call|email|meeting|proposal",
      priority: 1-5,
      due_date: "2026-02-25",
      reason: "High score + 5 days inactivity",
      suggested_content: "...",
      success_probability: 0.85
    }
  ]
}
```

**Lógica**:
- Score >= 70 + dias_inactivo > 5: "Call now"
- Score >= 70 + last_stage + dias > 10: "Send proposal"
- Score < 30 + dias_criado > 30: "Re-qualify or disqualify"
- Score drop > 20pts: "Analyze what changed"
- Won deals na semana: Suggest follow-up/upsell

---

### Feature 3: Enrichment Suggestions Widget (0.8h)
**Arquivo**: `components/dashboard/widgets/EnrichmentSuggestionsWidget.jsx`

**Funcionalidades**:
- Identifica gaps de informação
- Card por sugestão:
  - Type (missing_field, cross_sell, upsell, related_contact)
  - Description
  - Benefit explanation
  - Action button (Add field, Log activity, etc)
  - Impact score

**Visual**:
- Compact cards
- Icon + color por tipo
- Quick action buttons
- Sort by impact

---

### Feature 4: Suggest Enrichment Function (0.7h)
**Arquivo**: `functions/suggestEnrichment.js`

**Análise**:
1. Missing fields:
   - contact.cep, contact.phone, contact.email
   - SalesOpportunity.description, expected_close_date
   - FiscalData fields (if company)

2. Cross-sell/Upsell:
   - Similar companies (by CNAE)
   - Services used by similar leads
   - Larger deal size in same segment

3. Related contacts:
   - Same company (PJ)
   - Same economic group
   - Same industry (by CNAE)

**Outputs**:
```javascript
{
  suggestions: [
    {
      contact_id: "...",
      type: "missing_field|cross_sell|upsell|related_contact",
      field_name: "phone", // for missing_field
      description: "Add phone number",
      benefit: "Better contact rate",
      impact_score: 0.8,
      related_id: "..." // for related contacts
    }
  ]
}
```

---

### Feature 5: Predictive Analytics Function (0.5h)
**Arquivo**: `functions/predictLeadOutcome.js`

**Predições**:
1. Conversion probability (já tem em opportunity)
2. Lead Lifetime Value (LTV):
   - Based on deal_value + historical data
   - Estimate of total revenue

3. Churn Risk Score (0-100):
   - Days inactive > 30: +30 pontos
   - Score drop: +10 pontos
   - No activities: +20 pontos

4. Ideal contact frequency:
   - Hot (score >= 70): 2x por semana
   - Warm (30-70): 1x por semana
   - Cold: 1x a cada 2 semanas

**Outputs**:
```javascript
{
  opportunity_id: "...",
  conversion_probability: 75,
  ltv_estimate: 120000,
  churn_risk: 15,
  contact_frequency: "2x per week",
  next_contact_window: "2026-02-23"
}
```

---

## 📊 DASHBOARD UPDATE - Sprint 10.3

```
Row 1: Contact Statistics | Contact Tags | Duplicate Alerts + Data Quality
Row 2: Recent Activity | Tag Performance
Row 3: Contact Growth (full width)
Row 4: Sales Pipeline Kanban (full width, 6 columns)
Row 5: Lead Scoring (col 1) | Revenue Forecast (cols 2-3)
Row 6: Pipeline Performance (full width, KPIs + Funnel + W/L + Cycle)
Row 7: AI Insights (col 1) | Enrichment Suggestions (col 2)  [NEW]
```

---

## 📦 ARQUIVOS A CRIAR

### Components: 2
1. `components/dashboard/widgets/AIInsightsWidget.jsx` (~280 linhas)
2. `components/dashboard/widgets/EnrichmentSuggestionsWidget.jsx` (~200 linhas)

### Backend Functions: 3
1. `functions/recommendNextActions.js` (~150 linhas)
2. `functions/suggestEnrichment.js` (~120 linhas)
3. `functions/predictLeadOutcome.js` (~100 linhas)

### Total: ~850 linhas código

---

## 🔧 IMPLEMENTAÇÃO STRATEGY

### Order:
1. Backend functions first (recommendNextActions, suggestEnrichment, predictLeadOutcome)
2. Test functions com test_backend_function
3. AIInsightsWidget component
4. EnrichmentSuggestionsWidget component
5. Integrate to Dashboard (Row 7)
6. Sample data para testing

### Testing:
- Test cada function independentemente
- Verify outputs
- Test widgets com mock data
- Verify performance (caching)

---

## ⏱️ TIMELINE

| Task | Estimativa | Notas |
|------|-----------|-------|
| recommendNextActions.js | 1h | Lógica mais complexa |
| suggestEnrichment.js | 0.7h | Data analysis |
| predictLeadOutcome.js | 0.5h | Cálculos simples |
| AIInsightsWidget.jsx | 0.8h | Cards + actions |
| EnrichmentSuggestionsWidget.jsx | 0.6h | Compact cards |
| Dashboard integration | 0.3h | Add widgets |
| Testing + validation | 0.5h | Manual testing |
| **Total** | **~4 horas** | Contingency included |

---

## 🎯 SUCCESS CRITERIA

- [x] All 3 backend functions deployed
- [x] Functions return correct data structure
- [x] AIInsightsWidget displays recomendations correctly
- [x] EnrichmentSuggestionsWidget shows gaps
- [x] Dashboard Row 7 renders properly
- [x] Dark mode support
- [x] Responsive design
- [x] Performance acceptable (queries cache)
- [x] Error handling + loading states
- [x] Build passing

---

## 🚀 FASE 10 COMPLETION

After Sprint 10.3:
- 7 widgets implemented
- 4 backend functions
- Complete sales pipeline management
- Lead scoring + forecasting
- AI insights + recommendations
- Enrichment suggestions

**Total Phase 10 LOC**: ~2000 linhas  
**Total Phase 10 Time**: ~8.5 horas  

---

**Status**: READY TO EXECUTE  
**Next Action**: Start Sprint 10.3 implementation