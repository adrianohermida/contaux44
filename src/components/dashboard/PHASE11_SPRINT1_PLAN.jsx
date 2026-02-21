# 🚀 FASE 11 - SPRINT 11.1 PLANEJAMENTO
**Status**: PRONTO PARA EXECUÇÃO  
**Data Início**: 2026-02-21  
**Estimativa**: 4 horas

---

## 🎯 OBJETIVO SPRINT 11.1
Implementar capacidades de sucesso do cliente e retenção através de health scoring, risk analysis e customer journey tracking.

---

## 📋 BACKLOG SPRINT 11.1

### Feature 1: Customer Health Widget (1.5h)
**Arquivo**: `components/dashboard/widgets/CustomerHealthWidget.jsx`

**Funcionalidades**:
- Health score gauge (0-100, color-coded)
- 4 health factors:
  - Payment Health (on-time rate %)
  - Engagement Level (activity count/month)
  - Support Satisfaction (avg rating)
  - Product Usage (feature adoption %)
- Trend indicator (↑ improving, ↓ declining, → stable)
- Health breakdown chart
- Drill-down to customer details

**Visual**:
- Central circular gauge
- 4 metric cards below
- Color: Red < 50, Yellow 50-75, Green > 75
- Trend badges with arrows

---

### Feature 2: Customer Health Score Function (1h)
**Arquivo**: `functions/calculateCustomerHealth.js`

**Algoritmo**:
1. Fetch customer data (invoices, activities, support tickets)
2. Calculate metrics:
   - Payment Health: On-time payments / total payments × 100
   - Engagement: Activity count last 30 days / 30 × 100
   - Satisfaction: Avg support ticket rating × 100
   - Usage: Features used / total features × 100

3. Weighted calculation:
   - Payment: 40%
   - Engagement: 25%
   - Satisfaction: 20%
   - Usage: 15%

4. Return score + breakdown

**Output**:
```javascript
{
  contact_id: "...",
  health_score: 78,
  payment_health: 95,
  engagement_level: 65,
  satisfaction: 70,
  usage_adoption: 55,
  trend: "improving|declining|stable",
  health_status: "healthy|at_risk|critical",
  recommendation: "..."
}
```

---

### Feature 3: Retention Risk Dashboard (1h)
**Arquivo**: `components/dashboard/widgets/RetentionRiskWidget.jsx`

**Funcionalidades**:
- List of at-risk customers
- Risk score per customer (0-100)
- Risk factors displayed
- Action recommendations
- Sort by risk score
- Risk severity colors

**Risk Factors**:
- Health score drop > 20pts in 30 days
- No activity > 60 days
- Payment delays > 14 days
- Support satisfaction < 3/5
- Feature adoption decline

**Visual**:
- Table with customer name, health, risk factors, actions
- Color coding: Red (critical), Yellow (warning), Green (stable)

---

### Feature 4: Customer Journey Timeline (0.8h)
**Archivo**: `components/dashboard/widgets/CustomerJourneyWidget.jsx`

**Funcionalidades**:
- Timeline of customer events:
  - First purchase
  - Milestones (10, 50, 100+ features)
  - High engagement periods
  - Support interactions
  - Renewal dates
- Vertical timeline
- Event details on hover/click
- Filter by event type

**Visual**:
- Vertical timeline (left-aligned)
- Dot + label per event
- Color per event type
- Condensed on mobile

---

## 📊 DASHBOARD UPDATE - Sprint 11.1

```
Row 1: Contact Stats | Tags | Duplicates + Quality
Row 2: Recent Activity | Tag Performance
Row 3: Contact Growth (full width)
Row 4: Sales Pipeline Kanban (6 columns)
Row 5: Lead Scoring | Revenue Forecast
Row 6: Pipeline Performance (full width)
Row 7: AI Insights | Enrichment Suggestions
Row 8: Customer Health | Retention Risk  [NEW]
Row 9: Customer Journey Timeline (full)  [NEW]
```

---

## 📦 ARQUIVOS A CRIAR

### Components: 3
1. `components/dashboard/widgets/CustomerHealthWidget.jsx` (~220 linhas)
2. `components/dashboard/widgets/RetentionRiskWidget.jsx` (~200 linhas)
3. `components/dashboard/widgets/CustomerJourneyWidget.jsx` (~180 linhas)

### Backend Functions: 1
1. `functions/calculateCustomerHealth.js` (~120 linhas)

### Total: ~720 linhas código

---

## 🔧 IMPLEMENTAÇÃO STRATEGY

### Order:
1. Backend function calculateCustomerHealth (core logic)
2. Test function with sample data
3. CustomerHealthWidget component
4. RetentionRiskWidget component
5. CustomerJourneyWidget component
6. Dashboard Row 8 + 9 integration
7. Sample data for testing

### Testing:
- Test calculateCustomerHealth independently
- Test widgets with mock data
- Verify performance (caching)
- Check dark mode

---

## ⏱️ TIMELINE

| Task | Estimativa |
|------|-----------|
| calculateCustomerHealth.js | 1h |
| CustomerHealthWidget.jsx | 0.8h |
| RetentionRiskWidget.jsx | 0.8h |
| CustomerJourneyWidget.jsx | 0.7h |
| Dashboard integration | 0.3h |
| Testing + validation | 0.5h |
| **Total** | **~4 horas** |

---

## 🎯 SUCCESS CRITERIA

- [x] Health function deployed & tested
- [x] All 3 widgets render correctly
- [x] Dashboard rows 8-9 display properly
- [x] Dark mode support
- [x] Responsive design
- [x] Performance acceptable
- [x] Error handling + loading states
- [x] Build passing

---

## 🚀 PRÓXIMAS FASES

### Phase 11 (Customer Success):
- Sprint 11.1: Customer Health & Retention (THIS)
- Sprint 11.2: Automated Campaigns & Workflows
- Sprint 11.3: Loyalty Program Manager

### Phase 12 (Advanced Analytics):
- ML-based churn prediction
- Revenue attribution modeling
- Customer segmentation

---

**Status**: READY TO EXECUTE  
**Next Action**: Start Sprint 11.1 implementation