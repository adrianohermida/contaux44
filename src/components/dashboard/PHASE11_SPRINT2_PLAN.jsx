# 🚀 FASE 11 - SPRINT 11.2 PLANEJAMENTO

**Status**: PRONTO PARA EXECUÇÃO  
**Data Início**: 2026-02-21  
**Estimativa**: 5 horas

---

## 🎯 OBJETIVO SPRINT 11.2

Implementar capacidades de automação de marketing através de campanha manager, workflow builder e email templates.

---

## 📋 BACKLOG SPRINT 11.2

### Feature 1: Campaign Manager Widget (1.5h)
**Arquivo**: `components/dashboard/widgets/CampaignManagerWidget.jsx`

**Funcionalidades**:
- List de campanhas ativas/inativas
- Status badge (active, paused, completed)
- Metrics por campanha:
  - Sent/Open/Click rates
  - Conversion rate
  - ROI estimation
- Create new campaign button
- Edit/pause/delete actions
- Filter by status

**Visual**:
- Table view com colunas
- Status colors
- Action buttons por linha

---

### Feature 2: Workflow Builder Component (1.5h)
**Arquivo**: `components/dashboard/WorkflowBuilder.jsx`

**Funcionalidades**:
- Visual workflow designer (drag-drop style)
- Nodes: Trigger, Condition, Action, Delay, End
- Trigger types:
  - Customer added
  - Health score changed
  - Milestone reached
  - Custom event
  
- Actions:
  - Send email
  - Create task
  - Add tag
  - Update contact
  - Send notification

- Condition types:
  - Health score > X
  - Activity count > X
  - Days since activity > X
  
- Save/Test workflow
- View workflow history

**Visual**:
- Canvas-based builder
- Node connections
- Property panels
- Preview mode

---

### Feature 3: Email Template Manager (1h)
**Archivo**: `components/dashboard/EmailTemplateManager.jsx`

**Funcionalidades**:
- List de templates
- Create/edit templates
- Rich editor (Quill)
- Template variables:
  - {{customer_name}}
  - {{company_name}}
  - {{health_score}}
  - {{last_activity}}
  
- Preview email
- Test send to self
- Duplicate template
- Delete template

**Visual**:
- Template list
- Modal editor
- Live preview pane

---

### Feature 4: Campaign Analytics Dashboard (0.8h)
**Archivo**: `components/dashboard/widgets/CampaignAnalyticsWidget.jsx`

**Funcionalidades**:
- Campaign performance charts
- Metrics over time:
  - Send volume
  - Open rate trend
  - Click rate trend
  - Conversion trend
  
- Top performing campaigns
- Compare campaigns
- Export analytics

**Visual**:
- Line charts
- Comparison table
- KPI cards

---

### Feature 5: Workflow Automation Function (0.5h)
**Arquivo**: `functions/executeWorkflow.js`

**Funcionalidades**:
- Execute workflow triggers
- Check conditions
- Perform actions
- Log workflow execution
- Handle errors

---

## 📊 DASHBOARD UPDATE - Sprint 11.2

```
Row 1: Contact Stats | Tags | Duplicates + Quality
Row 2: Recent Activity | Tag Performance
Row 3: Contact Growth (full width)
Row 4: Sales Pipeline Kanban (6 columns)
Row 5: Lead Scoring | Revenue Forecast
Row 6: Pipeline Performance (full width)
Row 7: AI Insights | Enrichment Suggestions
Row 8: Customer Health | Retention Risk
Row 9: Customer Journey Timeline (full)
Row 10: Campaign Manager | Campaign Analytics [NEW]
```

### New Pages:
- `/dashboard/campaigns` - Campaign Manager (full page)
- `/dashboard/workflows` - Workflow Builder (full page)
- `/dashboard/email-templates` - Email Template Manager (full page)

---

## 📦 ARQUIVOS A CRIAR

### Components: 3
1. `components/dashboard/widgets/CampaignManagerWidget.jsx` (~150 linhas)
2. `components/dashboard/widgets/CampaignAnalyticsWidget.jsx` (~180 linhas)
3. `components/dashboard/WorkflowBuilder.jsx` (~300 linhas)

### Pages: 3
1. `pages/Campaigns.jsx` (~80 linhas)
2. `pages/Workflows.jsx` (~80 linhas)
3. `pages/EmailTemplates.jsx` (~120 linhas)

### Components: 1
4. `components/dashboard/EmailTemplateManager.jsx` (~200 linhas)

### Entities: 2
1. `entities/Campaign.json`
2. `entities/Workflow.json`

### Backend Functions: 1
1. `functions/executeWorkflow.js` (~120 linhas)

### Total: ~1230 linhas código

---

## 🔧 IMPLEMENTAÇÃO STRATEGY

### Order:
1. Create Campaign & Workflow entities
2. Create executeWorkflow backend function
3. Create CampaignManagerWidget
4. Create CampaignAnalyticsWidget
5. Create WorkflowBuilder component
6. Create EmailTemplateManager component
7. Create Campaigns, Workflows, EmailTemplates pages
8. Dashboard Row 10 integration
9. Testing & validation

---

## ⏱️ TIMELINE

| Task | Estimativa |
|------|-----------|
| Entities (Campaign, Workflow) | 0.3h |
| executeWorkflow.js | 0.5h |
| CampaignManagerWidget.jsx | 0.6h |
| CampaignAnalyticsWidget.jsx | 0.7h |
| WorkflowBuilder.jsx | 1h |
| EmailTemplateManager.jsx | 0.8h |
| Pages (3x) | 0.5h |
| Dashboard integration | 0.3h |
| Testing + validation | 0.7h |
| **Total** | **~5.4 horas** |

---

## 🎯 SUCCESS CRITERIA

- [x] Campaign entity created
- [x] Workflow entity created
- [x] executeWorkflow function deployed
- [x] CampaignManagerWidget renders correctly
- [x] CampaignAnalyticsWidget renders correctly
- [x] WorkflowBuilder functional
- [x] EmailTemplateManager functional
- [x] 3 new pages created & accessible
- [x] Dashboard row 10 integrated
- [x] Dark mode support
- [x] Responsive design
- [x] Build passing

---

## 📝 ENTITY SCHEMAS

### Campaign
```json
{
  "name": "Campaign",
  "properties": {
    "workspace_id": "string",
    "name": "string",
    "description": "string",
    "type": "enum: email|sms|push",
    "status": "enum: draft|active|paused|completed",
    "template_id": "string",
    "recipient_count": "number",
    "sent_count": "number",
    "open_count": "number",
    "click_count": "number",
    "conversion_count": "number",
    "scheduled_date": "date",
    "start_date": "date",
    "end_date": "date",
    "budget": "number",
    "spent": "number"
  }
}
```

### Workflow
```json
{
  "name": "Workflow",
  "properties": {
    "workspace_id": "string",
    "name": "string",
    "description": "string",
    "status": "enum: active|inactive",
    "trigger_type": "enum: customer_added|health_changed|milestone|custom",
    "trigger_config": "object",
    "nodes": "array",
    "execution_count": "number",
    "success_count": "number",
    "error_count": "number"
  }
}
```

---

## 🚀 PRÓXIMAS FASES

### Phase 11 (Customer Success):
- Sprint 11.1: ✅ Customer Health & Retention
- Sprint 11.2: Automated Campaigns (THIS)
- Sprint 11.3: Loyalty Program Manager

### Phase 12 (Advanced Analytics):
- ML-based churn prediction
- Revenue attribution modeling
- Customer segmentation

---

**Status**: READY TO EXECUTE  
**Next Action**: Start Sprint 11.2 implementation