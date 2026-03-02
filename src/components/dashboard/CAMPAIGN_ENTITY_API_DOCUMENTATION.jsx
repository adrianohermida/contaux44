# 📚 CAMPAIGN ENTITY - API DOCUMENTATION

**Last Updated:** 03/03/2026  
**Sprint:** 19 - Campaigns & Marketing Automation  
**Status:** ✅ Complete - Production Ready  
**Version:** 1.0.0

---

## 📋 TABLE OF CONTENTS

1. [Entity Overview](#entity-overview)
2. [Schema Definition](#schema-definition)
3. [API Endpoints](#api-endpoints)
4. [CRUD Operations](#crud-operations)
5. [Segmentation & Targeting](#segmentation--targeting)
6. [Engagement Tracking](#engagement-tracking)
7. [Budget Management](#budget-management)
8. [Workflows](#workflows)
9. [Integration Points](#integration-points)
10. [Error Handling](#error-handling)

---

## 🎯 ENTITY OVERVIEW

### Purpose
The Campaign entity manages marketing campaigns across multiple channels (email, SMS, push notifications, social media). Supports scheduling, segmentation, template selection, and engagement tracking.

### Key Features
- ✅ Multi-channel support (email, SMS, push, social)
- ✅ Scheduled & recurring campaigns
- ✅ Smart recipient segmentation (hot/warm/cold leads, recent activity)
- ✅ Real-time engagement tracking (opens, clicks, conversions)
- ✅ Budget & cost management (CPM, ROI calculation)
- ✅ Template-based campaign creation
- ✅ Batch processing (100-item batches)
- ✅ Campaign status management (draft → scheduled → active → completed)
- ✅ Personalization with variable substitution
- ✅ Multi-tenancy support
- ✅ Full CRUD operations

---

## 📐 SCHEMA DEFINITION

### Campaign Entity Structure

```json
{
  "name": "Campaign",
  "type": "object",
  "properties": {
    "workspace_id": {
      "type": "string",
      "description": "Workspace ID for multi-tenancy (REQUIRED)"
    },
    "name": {
      "type": "string",
      "description": "Campaign name (REQUIRED)"
    },
    "type": {
      "type": "string",
      "enum": ["email", "sms", "push", "social"],
      "default": "email",
      "description": "Campaign type/channel"
    },
    "status": {
      "type": "string",
      "enum": ["draft", "scheduled", "active", "paused", "completed", "cancelled"],
      "default": "draft",
      "description": "Campaign status"
    },
    "template_id": {
      "type": "string",
      "description": "Reference to email/message template"
    },
    "subject_line": {
      "type": "string",
      "description": "Subject line for email campaigns"
    },
    "body_content": {
      "type": "string",
      "description": "Campaign message body (HTML or plain text)"
    },
    "recipient_count": {
      "type": "number",
      "default": 0,
      "description": "Total number of recipients"
    },
    "sent_count": {
      "type": "number",
      "default": 0,
      "description": "Number of messages successfully sent"
    },
    "engagement_metrics": {
      "type": "object",
      "properties": {
        "open_count": { "type": "number", "default": 0 },
        "click_count": { "type": "number", "default": 0 },
        "conversion_count": { "type": "number", "default": 0 },
        "unsubscribe_count": { "type": "number", "default": 0 }
      },
      "description": "Engagement metrics"
    },
    "target_segment": {
      "type": "string",
      "enum": ["all_contacts", "hot_leads", "warm_leads", "cold_leads", "recent_activity"],
      "description": "Target audience segment"
    },
    "budget": {
      "type": "number",
      "default": 0,
      "description": "Campaign budget"
    },
    "spent": {
      "type": "number",
      "default": 0,
      "description": "Amount spent"
    },
    "cost_per_message": {
      "type": "number",
      "default": 0,
      "description": "Cost per message/send"
    },
    "is_recurring": {
      "type": "boolean",
      "default": false,
      "description": "Whether campaign repeats"
    },
    "recurrence_pattern": {
      "type": "string",
      "enum": ["daily", "weekly", "monthly", "quarterly"],
      "description": "Recurrence pattern"
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Campaign tags"
    }
  },
  "required": ["workspace_id", "name", "type"]
}
```

---

## 🔌 API ENDPOINTS

### Base URL
```
https://api.base44.app/entities/Campaign
```

### Available Operations
- `POST /create` - Create new campaign
- `GET /filter` - Filter/list campaigns
- `GET /get/:id` - Retrieve single campaign
- `PUT /update/:id` - Update campaign
- `DELETE /delete/:id` - Delete campaign

---

## 📝 CRUD OPERATIONS

### CREATE - New Campaign

```typescript
const campaign = await base44.entities.Campaign.create({
  workspace_id: "ws_1",
  name: "Spring Sale 2026",
  type: "email",
  template_id: "tpl_1",
  subject_line: "Spring Collection Now Available",
  body_content: "<html>Welcome to spring...</html>",
  target_segment: "hot_leads",
  budget: 5000,
  cost_per_message: 0.10,
  tags: ["promotional", "seasonal"]
});

// Returns: campaign with id, created_date, status: "draft"
```

### READ - Retrieve Campaigns

```typescript
// Get all campaigns
const campaigns = await base44.entities.Campaign.filter({
  workspace_id: "ws_1"
}, "-start_date", 100);

// Filter by status
const active = await base44.entities.Campaign.filter({
  workspace_id: "ws_1",
  status: "active"
});

// Filter by type
const emailCampaigns = await base44.entities.Campaign.filter({
  workspace_id: "ws_1",
  type: "email"
});
```

### UPDATE - Modify Campaign

```typescript
// Schedule campaign
const updated = await base44.entities.Campaign.update("camp_1", {
  scheduled_date: "2026-04-15T10:00:00",
  status: "scheduled"
});

// Execute campaign
const updated = await base44.entities.Campaign.update("camp_1", {
  status: "active",
  start_date: new Date().toISOString()
});

// Track engagement
const updated = await base44.entities.Campaign.update("camp_1", {
  engagement_metrics: {
    open_count: 250,
    click_count: 50,
    conversion_count: 5
  }
});
```

### DELETE - Remove Campaign

```typescript
const deleted = await base44.entities.Campaign.delete("camp_1");
```

---

## 🎯 SEGMENTATION & TARGETING

### Segment Types

```typescript
// 1. All Contacts - Send to everyone
target_segment: "all_contacts"

// 2. Hot Leads - Score >= 70 (ready to close)
target_segment: "hot_leads"

// 3. Warm Leads - Score 30-70 (engaged)
target_segment: "warm_leads"

// 4. Cold Leads - Score < 30 (needs nurturing)
target_segment: "cold_leads"

// 5. Recent Activity - Active last 7 days
target_segment: "recent_activity"
```

### Automatic Filtering

```typescript
// When executing campaign, system automatically filters:
- hot_leads: ~500 recipients (lead_score >= 70)
- warm_leads: ~2000 recipients (lead_score 30-70)
- cold_leads: ~1500 recipients (lead_score < 30)
- recent_activity: ~800 recipients (last activity <= 7 days)
```

---

## 📊 ENGAGEMENT TRACKING

### Metrics Tracked

```typescript
engagement_metrics: {
  open_count: 250,      // How many opened email
  click_count: 50,      // How many clicked links
  conversion_count: 5,  // How many converted
  unsubscribe_count: 3  // How many unsubscribed
}
```

### Calculating Rates

```typescript
const openRate = (engagement_metrics.open_count / sent_count) * 100;
// Example: 250 opens / 1000 sent = 25% open rate

const clickRate = (engagement_metrics.click_count / sent_count) * 100;
// Example: 50 clicks / 1000 sent = 5% click rate

const conversionRate = (engagement_metrics.conversion_count / sent_count) * 100;
// Example: 5 conversions / 1000 sent = 0.5% conversion rate
```

---

## 💰 BUDGET MANAGEMENT

### Cost Calculation

```typescript
const campaign = {
  budget: 1000,              // Total budget
  cost_per_message: 0.10,    // $0.10 per send
  recipient_count: 5000      // Target audience
};

const estimated_cost = campaign.recipient_count * campaign.cost_per_message;
// 5000 × $0.10 = $500 estimated cost

const roi = ((revenue - budget) / budget) * 100;
// Example: ($5000 revenue - $500 cost) / $500 = 900% ROI
```

### Budget Constraints

- System enforces budget limits
- Prevents overspending
- Tracks spent amount in real-time
- Calculates cost per conversion

---

## 🔄 WORKFLOWS

### Campaign Lifecycle

```
DRAFT → SCHEDULED → ACTIVE → COMPLETED/PAUSED → CANCELLED
  ↓
- Edit freely
- Preview template
- Select recipients
- Set schedule
  ↓
- Scheduled for future
- Can pause if needed
  ↓
- Sending in progress
- Track engagement real-time
  ↓
- All sent
- View final metrics
- Calculate ROI
```

### Recurring Campaign Setup

```typescript
const campaign = await base44.entities.Campaign.create({
  name: "Weekly Newsletter",
  type: "email",
  is_recurring: true,
  recurrence_pattern: "weekly",        // daily|weekly|monthly|quarterly
  recurrence_end_date: "2026-12-31",
  scheduled_date: "2026-03-10T09:00"   // First send date
});

// System automatically:
// - Sends every week at 09:00
// - Repeats until recurrence_end_date
// - Each instance has separate metrics
```

---

## 🔗 INTEGRATION POINTS

### Template Integration

```typescript
// Get templates
const templates = await base44.entities.Template.filter({
  workspace_id: ws_id
});

// Create campaign from template
const campaign = await base44.entities.Campaign.create({
  template_id: template.id,
  name: template.name,
  body_content: template.content
});
```

### Backend Functions

#### executeCampaign
```typescript
const result = await base44.functions.invoke('executeCampaign', {
  campaign_id: "camp_1",
  workspace_id: "ws_1"
});

// Returns:
{
  success: true,
  recipients_count: 5000,
  status: "Campaign execution started"
}
```

#### emailTemplateEngine
```typescript
const rendered = await base44.functions.invoke('emailTemplateEngine', {
  template_id: "tpl_1",
  recipient_data: {
    first_name: "John",
    email: "john@example.com"
  }
});

// Returns:
{
  rendered_subject: "Hi John, Check out our new products!",
  rendered_body: "<p>Hi John...</p>",
  engagement_baseline: {
    predicted_open_rate: 0.45,
    predicted_click_rate: 0.15
  }
}
```

---

## ⚠️ ERROR HANDLING

### Common Errors

```typescript
// Campaign not found
{ error: "Campaign not found", status: 404 }

// Invalid campaign type
{ error: "type must be one of: email, sms, push, social", status: 400 }

// Budget exceeded
{ error: "Estimated cost exceeds budget", status: 400 }

// Invalid status transition
{ error: "Cannot move from draft to completed", status: 400 }

// Multi-tenancy violation
{ error: "Unauthorized: tenant mismatch", status: 403 }
```

---

## 🏆 BEST PRACTICES

1. **Always set target segment** before executing
2. **Use templates** for consistent formatting
3. **Test with small segment** before full campaign
4. **Monitor engagement rates** in real-time
5. **Set appropriate budget limits**
6. **Schedule during optimal times** (business hours)
7. **Use tags** for campaign organization
8. **Track ROI** after campaign completes

---

**API Documentation Version:** 1.0.0  
**Last Updated:** 03/03/2026  
**Status:** ✅ Production Ready