# 📚 SALESOPPORTUNITY ENTITY - API DOCUMENTATION

**Last Updated:** 03/03/2026  
**Sprint:** 18 - SalesOpportunity & Lead Scoring  
**Status:** ✅ Complete - Production Ready  
**Version:** 1.0.0

---

## 📋 TABLE OF CONTENTS

1. [Entity Overview](#entity-overview)
2. [Schema Definition](#schema-definition)
3. [API Endpoints](#api-endpoints)
4. [CRUD Operations](#crud-operations)
5. [Lead Scoring Algorithm](#lead-scoring-algorithm)
6. [Workflows](#workflows)
7. [Integration Points](#integration-points)
8. [Error Handling](#error-handling)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 ENTITY OVERVIEW

### Purpose
The SalesOpportunity entity manages sales pipelines and tracks opportunities from prospect to closing. It automatically calculates lead scores based on deal characteristics and engagement metrics.

### Key Features
- ✅ Automatic lead score calculation (0-100)
- ✅ 6-stage pipeline (prospect → qualified → proposal → negotiation → won/lost)
- ✅ Real-time lead scoring with Hot/Warm/Cold categorization
- ✅ Conversion probability tracking (0-100%)
- ✅ Quote integration (optional link to Quote entity)
- ✅ Activity date tracking for engagement metrics
- ✅ Multiple opportunity sources (direct, referral, website, inbound, cold_call, other)
- ✅ Related contacts tracking
- ✅ Opportunity tagging
- ✅ Multi-tenancy support
- ✅ Full CRUD operations

---

## 📐 SCHEMA DEFINITION

### SalesOpportunity Entity Structure

```json
{
  "name": "SalesOpportunity",
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "Workspace ID for multi-tenancy (REQUIRED)"
    },
    "contact_id": {
      "type": "string",
      "description": "Reference to Client entity (REQUIRED)"
    },
    "opportunity_name": {
      "type": "string",
      "description": "Opportunity name/title (REQUIRED)"
    },
    "deal_value": {
      "type": "number",
      "description": "Opportunity value in currency (REQUIRED)"
    },
    "pipeline_stage": {
      "type": "string",
      "enum": ["prospect", "qualified", "proposal", "negotiation", "won", "lost"],
      "default": "prospect",
      "description": "Current pipeline stage"
    },
    "conversion_probability": {
      "type": "number",
      "default": 0,
      "description": "Probability of conversion (0-100)"
    },
    "lead_score": {
      "type": "number",
      "default": 0,
      "description": "Auto-calculated lead score (0-100)"
    },
    "expected_close_date": {
      "type": "string",
      "format": "date",
      "description": "Expected close date"
    },
    "last_activity_date": {
      "type": "string",
      "format": "date",
      "description": "Last interaction date"
    },
    "description": {
      "type": "string",
      "description": "Opportunity description/notes"
    },
    "source": {
      "type": "string",
      "enum": ["direct", "referral", "website", "inbound", "cold_call", "other"],
      "default": "direct",
      "description": "Opportunity source"
    },
    "is_active": {
      "type": "boolean",
      "default": true,
      "description": "Whether opportunity is active"
    },
    "quote_id": {
      "type": "string",
      "description": "Reference to Quote entity (OPTIONAL)"
    },
    "related_contacts": {
      "type": "array",
      "items": {"type": "string"},
      "description": "Related contact IDs"
    },
    "tags": {
      "type": "array",
      "items": {"type": "string"},
      "description": "Opportunity tags"
    }
  },
  "required": ["workspace_id", "contact_id", "opportunity_name", "deal_value"]
}
```

### Built-in Fields
- `id`: Unique opportunity identifier
- `created_date`: Timestamp of creation
- `updated_date`: Timestamp of last update
- `created_by`: Email of user who created

---

## 🔌 API ENDPOINTS

### Base URL
```
https://api.base44.app/entities/SalesOpportunity
```

### Available Operations
- `POST /create` - Create new opportunity
- `GET /filter` - Filter/list opportunities
- `GET /get/:id` - Retrieve single opportunity
- `PUT /update/:id` - Update opportunity
- `DELETE /delete/:id` - Delete opportunity

---

## 📝 CRUD OPERATIONS

### CREATE - New Opportunity

```typescript
const opportunity = await base44.entities.SalesOpportunity.create({
  workspace_id: "ws_1",
  contact_id: "cli_1",
  opportunity_name: "Enterprise Software Deal",
  deal_value: 250000,
  pipeline_stage: "prospect",
  conversion_probability: 10,
  expected_close_date: "2026-06-30",
  last_activity_date: "2026-03-02",
  source: "inbound",
  is_active: true,
  description: "Large enterprise account looking for platform",
  tags: ["strategic", "high-value"]
});

// Response includes auto-calculated lead_score
// lead_score calculated based on: deal_value, pipeline_stage, probability, activity, close_date
```

### READ - Retrieve Opportunities

```typescript
// Get single opportunity
const opp = await base44.entities.SalesOpportunity.filter({
  id: "opp_1",
  workspace_id: "ws_1"
});

// Filter by pipeline stage
const proposals = await base44.entities.SalesOpportunity.filter({
  workspace_id: "ws_1",
  pipeline_stage: "proposal"
}, "-lead_score", 50);

// Filter by lead score (Hot: 70+, Warm: 30-70, Cold: 0-30)
const hotLeads = await base44.entities.SalesOpportunity.filter({
  workspace_id: "ws_1"
}).then(opps => opps.filter(o => o.lead_score >= 70));

// List all with sorting by lead score
const topOpportunities = await base44.entities.SalesOpportunity.filter(
  { workspace_id: "ws_1" },
  "-lead_score",  // Sort descending
  100  // Limit
);
```

### UPDATE - Modify Opportunity

```typescript
// Move to next stage
const updated = await base44.entities.SalesOpportunity.update("opp_1", {
  pipeline_stage: "qualified",
  conversion_probability: 40
});

// Update deal value (recalculates lead score)
const updated = await base44.entities.SalesOpportunity.update("opp_1", {
  deal_value: 350000
});

// Record activity
const updated = await base44.entities.SalesOpportunity.update("opp_1", {
  last_activity_date: new Date().toISOString().split('T')[0],
  description: "Had kick-off meeting with stakeholders"
});

// Link quote
const updated = await base44.entities.SalesOpportunity.update("opp_1", {
  quote_id: "quote_1",
  pipeline_stage: "proposal"
});

// Close as won
const updated = await base44.entities.SalesOpportunity.update("opp_1", {
  pipeline_stage: "won",
  conversion_probability: 100,
  lead_score: 100
});
```

### DELETE - Remove Opportunity

```typescript
// Delete opportunity
const deleted = await base44.entities.SalesOpportunity.delete("opp_1");
```

---

## 🧮 LEAD SCORING ALGORITHM

### Scoring Formula

```
Total Score = DealValueScore + ActivityScore + StageScore + ProbabilityScore + DateScore
Final Score = MIN(100, Total Score)
```

### Scoring Factors

**1. Deal Value Score (0-20 points)**
```
Formula: MIN(20, (deal_value / 10000) * 20)
Examples:
  - $10,000 = 20 points (max)
  - $50,000 = 20 points (capped)
  - $5,000 = 10 points
  - $1,000 = 2 points
```

**2. Activity Recency Score (0-20 points)**
```
Rules:
  - 0-7 days: 20 points (very recent)
  - 8-30 days: 15 points (recent)
  - 31-60 days: 10 points (somewhat recent)
  - 61-90 days: 5 points (old)
  - 90+ days: 0 points (very old)
```

**3. Pipeline Stage Score (0-30 points)**
```
Stage Scores:
  - prospect: 5 points
  - qualified: 15 points
  - proposal: 20 points
  - negotiation: 25 points
  - won: 30 points
  - lost: 0 points
```

**4. Conversion Probability Score (0-20 points)**
```
Formula: (conversion_probability / 100) * 20
Examples:
  - 100% = 20 points
  - 75% = 15 points
  - 50% = 10 points
  - 25% = 5 points
  - 0% = 0 points
```

**5. Expected Close Date Score (0-10 points)**
```
Rules:
  - 0-30 days: 10 points (very soon)
  - 31-60 days: 8 points (soon)
  - 61-90 days: 6 points (medium term)
  - 91-180 days: 3 points (long term)
  - 180+ days: 1 point (very long term)
  - No date: 0 points
```

### Score Categories

```
Hot (70-100): Ready to close
  - Characteristics: High deal value, recent activity, late stage, high probability
  - Action: Prioritize for immediate closing
  - Example: score = 85 (proposal stage, $200k deal, 80% probability, active last week)

Warm (30-70): Actively engaged
  - Characteristics: Medium deal value, regular activity, mid stage, moderate probability
  - Action: Continue nurturing and moving through pipeline
  - Example: score = 50 (qualified stage, $50k deal, 50% probability, active last month)

Cold (0-30): Needs nurturing
  - Characteristics: Low deal value, old activity, early stage, low probability
  - Action: Requires attention and engagement
  - Example: score = 15 (prospect stage, $10k deal, 10% probability, no recent activity)
```

---

## 🔄 WORKFLOWS

### Workflow 1: Prospect to Closed-Won

```
Create (prospect, 10% prob, score ~10-20)
    ↓
Qualify (15% prob, score ~15-25)
    ↓
Send Proposal (50-60% prob, score ~40-60)
    ↓
Negotiate (75-85% prob, score ~65-80)
    ↓
Close Won (100% prob, score 100)
```

### Workflow 2: Create Quote from Opportunity

```typescript
// 1. Create opportunity
const opp = await base44.entities.SalesOpportunity.create({
  workspace_id: tenant_id,
  contact_id: client_id,
  opportunity_name: "Deal Name",
  deal_value: 100000,
  pipeline_stage: "prospect"
});

// 2. Generate quote from opportunity
const quote = await base44.entities.Quote.create({
  tenant_id: tenant_id,
  client_id: client_id,
  total_amount: opp.deal_value,
  items: [...],
  status: "draft"
});

// 3. Link quote to opportunity
await base44.entities.SalesOpportunity.update(opp.id, {
  quote_id: quote.id,
  pipeline_stage: "proposal"
});
```

### Workflow 3: Activity Tracking

```typescript
// Record activity
const updated = await base44.entities.SalesOpportunity.update(opp_id, {
  last_activity_date: new Date().toISOString().split('T')[0],
  description: "Sent proposal and scheduled follow-up"
});

// Lead score automatically recalculates including activity recency
// Fresh activity = higher score bonus
```

---

## 🔗 INTEGRATION POINTS

### With Client Entity

```typescript
// Get client for opportunity
const clients = await base44.entities.Client.filter({
  id: opportunity.contact_id,
  tenant_id: workspace_id
});

const clientInfo = {
  name: clients[0].company_name,
  email: clients[0].email,
  phone: clients[0].phone
};
```

### With Quote Entity

```typescript
// Link quote to opportunity
const quote = await base44.entities.Quote.create({...});
await base44.entities.SalesOpportunity.update(opp.id, {
  quote_id: quote.id,
  pipeline_stage: "proposal"
});

// Track quote conversion
const opp = await base44.entities.SalesOpportunity.filter({
  quote_id: quote.id
});
```

### Backend Functions

#### calculateLeadScore
```typescript
const result = await base44.functions.invoke('calculateLeadScore', {
  opportunity_id: "opp_1",
  workspace_id: "ws_1"
});

// Returns:
{
  lead_score: 75,
  category: "hot",
  score_breakdown: {
    deal_value_score: 20,
    activity_score: 15,
    pipeline_score: 20,
    probability_score: 15,
    engagement_score: 5
  }
}
```

#### validateSalesOpportunityData
```typescript
const validation = await base44.functions.invoke('validateSalesOpportunityData', {
  opportunity_data: {...},
  workspace_id: "ws_1"
});

// Returns: { valid: true/false, errors: [...] }
```

---

## ⚠️ ERROR HANDLING

### Common Errors

```typescript
// Error: Client not found
{ error: "Client not found", status: 404 }

// Error: Invalid pipeline stage
{ error: "pipeline_stage must be one of: prospect, qualified, proposal, negotiation, won, lost", status: 400 }

// Error: Invalid probability
{ error: "conversion_probability must be between 0 and 100", status: 400 }

// Error: Deal value negative
{ error: "deal_value must be greater than or equal to 0", status: 400 }

// Error: Multi-tenancy violation
{ error: "Unauthorized: tenant mismatch", status: 403 }
```

---

## 🏆 BEST PRACTICES

### 1. Always Validate Before Create/Update
```typescript
// ✅ GOOD
const validation = await base44.functions.invoke('validateSalesOpportunityData', {
  opportunity_data: data,
  workspace_id: ws_id
});

if (validation.valid) {
  await base44.entities.SalesOpportunity.create(data);
}

// ❌ BAD
await base44.entities.SalesOpportunity.create(data);  // No validation
```

### 2. Track Activity for Lead Scoring
```typescript
// ✅ GOOD
await base44.entities.SalesOpportunity.update(opp_id, {
  last_activity_date: new Date().toISOString().split('T')[0],
  description: "Meeting with decision makers"
});

// ❌ BAD
// Not updating activity dates = stale lead scores
```

### 3. Update Probability as You Move Stages
```typescript
// ✅ GOOD
const probabilities = {
  prospect: 10,
  qualified: 30,
  proposal: 60,
  negotiation: 85,
  won: 100
};

await base44.entities.SalesOpportunity.update(opp_id, {
  pipeline_stage: newStage,
  conversion_probability: probabilities[newStage]
});
```

### 4. Use Lead Score Filtering
```typescript
// ✅ GOOD
const hotDeals = opportunities.filter(o => o.lead_score >= 70);
const warmDeals = opportunities.filter(o => o.lead_score >= 30 && o.lead_score < 70);
const coldDeals = opportunities.filter(o => o.lead_score < 30);

// Prioritize hot deals for sales team
```

### 5. Link Quotes Early
```typescript
// ✅ GOOD
const quote = await base44.entities.Quote.create({...});
await base44.entities.SalesOpportunity.update(opp_id, {
  quote_id: quote.id,
  pipeline_stage: "proposal"
});
```

---

## 🔧 TROUBLESHOOTING

### Issue: Lead score not updating
**Cause:** Score calculation is automatic on update, but requires valid data  
**Solution:** Ensure all required fields are filled; validate before update

### Issue: Opportunities showing as "Cold" unexpectedly
**Cause:** No recent activity or very early stage  
**Solution:** Record activity via `last_activity_date` to boost score

### Issue: Cannot move to negotiation from prospect
**Cause:** Pipeline stages should follow sequence (prospect → qualified → proposal → negotiation)  
**Solution:** Follow proper stage progression for better lead scoring

### Issue: Deal value not affecting score
**Cause:** Deal value score caps at 20 points  
**Solution:** Very high value deals get max score; use other factors (stage, activity, probability)

### Issue: Multi-tenancy violation errors
**Cause:** workspace_id mismatch in request  
**Solution:** Ensure workspace_id matches authenticated user's workspace

---

## 📊 PERFORMANCE TIPS

1. **Virtual Scrolling:** Use in list for 1000+ opportunities
2. **Query Caching:** React Query caches for 60 seconds
3. **Lazy Loading:** Load contacts/quotes on demand
4. **Indexing:** Ensure workspace_id and pipeline_stage are indexed
5. **Pagination:** Use limit/offset for large datasets

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