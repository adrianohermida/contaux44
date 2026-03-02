# 🧮 LEAD SCORING ALGORITHM - IMPLEMENTATION GUIDE

**Last Updated:** 03/03/2026  
**Sprint:** 18 - SalesOpportunity & Lead Scoring  
**Status:** ✅ Complete  
**Version:** 1.0.0

---

## 📋 TABLE OF CONTENTS

1. [Algorithm Overview](#algorithm-overview)
2. [Scoring Factors](#scoring-factors)
3. [Implementation Details](#implementation-details)
4. [Real-Time Calculation](#real-time-calculation)
5. [Category Classification](#category-classification)
6. [Integration Examples](#integration-examples)
7. [Performance Optimization](#performance-optimization)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 ALGORITHM OVERVIEW

### Purpose
The lead scoring algorithm provides an objective, data-driven score (0-100) that indicates the likelihood and urgency of closing a sales opportunity. Scores are recalculated in real-time as opportunity data changes.

### Key Characteristics
- ✅ **Weighted Factors:** 5 independent factors with different weights
- ✅ **Real-Time Calculation:** Updates automatically on opportunity change
- ✅ **Explainable Scores:** Breakdown shows contribution of each factor
- ✅ **Capped at 100:** Maximum score prevents artificial inflation
- ✅ **Category-Based:** Hot (70+), Warm (30-70), Cold (<30)
- ✅ **Dynamic:** Scores change as opportunity evolves

### Total Available Points
```
Maximum = 100 points
Factor 1 (Deal Value): 0-20 points (20% of total)
Factor 2 (Activity Recency): 0-20 points (20% of total)
Factor 3 (Pipeline Stage): 0-30 points (30% of total - highest weight)
Factor 4 (Conversion Probability): 0-20 points (20% of total)
Factor 5 (Close Date Proximity): 0-10 points (10% of total)
```

---

## 📊 SCORING FACTORS

### Factor 1: Deal Value Score (0-20 points)

**Rationale:** Larger deals warrant more sales attention and resources

**Calculation:**
```
Points = MIN(20, (deal_value / 10000) * 20)
```

**Scale:**
```
$0 → 0 points
$5,000 → 10 points
$10,000+ → 20 points (capped)
$50,000+ → 20 points (capped)
```

**Interpretation:**
- Small deals ($<5k): 0-10 points
- Medium deals ($5k-$25k): 10-15 points
- Large deals ($25k+): 15-20 points

**Example:**
```
deal_value = $150,000
Score = MIN(20, (150000 / 10000) * 20) = MIN(20, 300) = 20 points
```

### Factor 2: Activity Recency Score (0-20 points)

**Rationale:** Recent engagement indicates active opportunity

**Rules:**
```
If last_activity_date <= 7 days ago: 20 points
If last_activity_date <= 30 days ago: 15 points
If last_activity_date <= 60 days ago: 10 points
If last_activity_date <= 90 days ago: 5 points
If last_activity_date > 90 days ago: 0 points
If no last_activity_date: 0 points
```

**Calculation Example:**
```
Today: 2026-03-10
Last Activity: 2026-03-05 (5 days ago)
Score = 20 points (most recent)

Last Activity: 2026-02-28 (10 days ago)
Score = 15 points (recent)

Last Activity: 2025-12-15 (85 days ago)
Score = 5 points (old)
```

**Impact:**
- Very recent activity (active engagement) = HIGH score
- Old activity (stale opportunity) = LOW score

### Factor 3: Pipeline Stage Score (0-30 points)

**Rationale:** Deals farther in pipeline are closer to closing

**Stage Progression:**
```
prospect (5 points)
  ↓
qualified (15 points)
  ↓
proposal (20 points)
  ↓
negotiation (25 points)
  ↓
won (30 points)
  ↓
lost (0 points)
```

**Characteristics by Stage:**

```
PROSPECT (5 points):
  - Initial contact made
  - Needs discovery
  - Early qualification stage
  - Low certainty

QUALIFIED (15 points):
  - Decision maker identified
  - Budget confirmed
  - Needs understood
  - Medium-low certainty

PROPOSAL (20 points):
  - Proposal/quote sent
  - Technical requirements clear
  - Pricing discussion started
  - Medium certainty

NEGOTIATION (25 points):
  - Terms being discussed
  - Final objections being addressed
  - Close likely
  - High certainty

WON (30 points):
  - Deal closed successfully
  - Agreement signed
  - Maximum score

LOST (0 points):
  - Deal rejected/cancelled
  - No score value
  - May be reopened as prospect
```

### Factor 4: Conversion Probability Score (0-20 points)

**Rationale:** Explicit probability assessment should influence score

**Calculation:**
```
Points = (conversion_probability / 100) * 20
```

**Scale:**
```
0% probability → 0 points
25% probability → 5 points
50% probability → 10 points
75% probability → 15 points
100% probability → 20 points
```

**Typical Mapping:**
```
Stage: prospect → Expected prob: 10-20% → Score: 2-4 points
Stage: qualified → Expected prob: 30-40% → Score: 6-8 points
Stage: proposal → Expected prob: 60-70% → Score: 12-14 points
Stage: negotiation → Expected prob: 80-90% → Score: 16-18 points
Stage: won → Expected prob: 100% → Score: 20 points
```

### Factor 5: Expected Close Date Score (0-10 points)

**Rationale:** Imminent close dates indicate urgency

**Rules:**
```
If expected_close_date <= 30 days from now: 10 points
If expected_close_date <= 60 days from now: 8 points
If expected_close_date <= 90 days from now: 6 points
If expected_close_date <= 180 days from now: 3 points
If expected_close_date > 180 days from now: 1 point
If no expected_close_date: 0 points
```

**Calculation Example:**
```
Today: 2026-03-10
Expected Close: 2026-04-05 (26 days away)
Score = 10 points (very soon)

Expected Close: 2026-05-20 (71 days away)
Score = 6 points (medium-term)

Expected Close: 2026-10-01 (205 days away)
Score = 1 point (very far)
```

---

## 🧮 IMPLEMENTATION DETAILS

### Complete Calculation Example

```
Opportunity: "Enterprise Cloud Migration Deal"

Input Data:
  - deal_value: $200,000
  - pipeline_stage: "negotiation"
  - conversion_probability: 85%
  - last_activity_date: 2026-03-08 (2 days ago)
  - expected_close_date: 2026-04-15 (36 days from now)

Calculation:

1. Deal Value Score:
   = MIN(20, (200000 / 10000) * 20)
   = MIN(20, 400)
   = 20 points

2. Activity Recency Score:
   = 2 days ago → 20 points (very recent)

3. Pipeline Stage Score:
   = "negotiation" → 25 points

4. Probability Score:
   = (85 / 100) * 20
   = 0.85 * 20
   = 17 points

5. Close Date Score:
   = 36 days from now → 10 points (within 30-60 range)

TOTAL SCORE = 20 + 20 + 25 + 17 + 10 = 92 points

Category: HOT (92 >= 70)
Interpretation: Ready to close, prioritize for sales team
```

### Code Implementation

```javascript
function calculateLeadScore(opportunity) {
  let score = 0;
  const breakdown = {};

  // 1. Deal Value Score (0-20)
  if (opportunity.deal_value > 0) {
    breakdown.deal_value_score = Math.min(
      20,
      (opportunity.deal_value / 10000) * 20
    );
    score += breakdown.deal_value_score;
  }

  // 2. Activity Score (0-20)
  if (opportunity.last_activity_date) {
    const daysSince = Math.floor(
      (Date.now() - new Date(opportunity.last_activity_date)) / (1000 * 60 * 60 * 24)
    );
    if (daysSince <= 7) breakdown.activity_score = 20;
    else if (daysSince <= 30) breakdown.activity_score = 15;
    else if (daysSince <= 60) breakdown.activity_score = 10;
    else if (daysSince <= 90) breakdown.activity_score = 5;
    else breakdown.activity_score = 0;
  }
  score += breakdown.activity_score || 0;

  // 3. Stage Score (0-30)
  const stageScores = {
    prospect: 5, qualified: 15, proposal: 20,
    negotiation: 25, won: 30, lost: 0
  };
  breakdown.stage_score = stageScores[opportunity.pipeline_stage] || 0;
  score += breakdown.stage_score;

  // 4. Probability Score (0-20)
  breakdown.probability_score = (opportunity.conversion_probability / 100) * 20;
  score += breakdown.probability_score;

  // 5. Close Date Score (0-10)
  if (opportunity.expected_close_date) {
    const daysUntil = Math.floor(
      (new Date(opportunity.expected_close_date) - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntil <= 30) breakdown.date_score = 10;
    else if (daysUntil <= 60) breakdown.date_score = 8;
    else if (daysUntil <= 90) breakdown.date_score = 6;
    else if (daysUntil <= 180) breakdown.date_score = 3;
    else breakdown.date_score = 1;
  }
  score += breakdown.date_score || 0;

  // Cap at 100
  const finalScore = Math.min(100, Math.round(score));

  return {
    lead_score: finalScore,
    breakdown: breakdown,
    category: finalScore >= 70 ? 'hot' : finalScore >= 30 ? 'warm' : 'cold'
  };
}
```

---

## ⚡ REAL-TIME CALCULATION

### Automatic Updates Trigger

The lead score is automatically recalculated when ANY of these fields change:

1. `deal_value` - Updated deal amount
2. `pipeline_stage` - Moved to new stage
3. `conversion_probability` - Updated probability
4. `last_activity_date` - New activity recorded
5. `expected_close_date` - Close date changed

### Frontend Real-Time Display

```javascript
// In SalesOpportunityForm component
const leadScore = useMemo(() => calculateLeadScore(formData), [formData]);
const scoreCategory = useMemo(() => getScoreCategory(leadScore), [leadScore]);

// Score updates instantly as user types
<Input
  value={formData.deal_value}
  onChange={(e) => {
    setFieldValue('deal_value', e.target.value);
    // Lead score re-renders automatically
  }}
/>

// Display updates in real-time
<Badge>{leadScore}</Badge> {/* e.g., "85" */}
<Badge>{scoreCategory.label}</Badge> {/* e.g., "Quente" */}
```

### Backend Calculation Trigger

```javascript
// When opportunity is updated
await base44.entities.SalesOpportunity.update(opp_id, {
  pipeline_stage: 'negotiation',
  conversion_probability: 85
});

// Backend automatically:
// 1. Validates the data
// 2. Recalculates lead score based on new values
// 3. Updates the opportunity with new score
// 4. Returns updated record with new score
```

---

## 🎨 CATEGORY CLASSIFICATION

### Hot Opportunities (70-100 points)

**Definition:** Ready to close, highest priority

**Characteristics:**
- High deal value ($50k+) OR
- Advanced pipeline stage (proposal/negotiation/won) OR
- Recent activity (< 7 days) OR
- High probability (75%+) OR
- Close date imminent (< 30 days)

**Example Profiles:**
```
Profile 1 (Immediate Close):
  - Stage: negotiation (25 pts)
  - Probability: 90% (18 pts)
  - Deal: $150k (20 pts)
  - Activity: 2 days (20 pts)
  - Close: 15 days (10 pts)
  - TOTAL: 93 = HOT ✅

Profile 2 (Large Deal):
  - Stage: proposal (20 pts)
  - Probability: 60% (12 pts)
  - Deal: $500k (20 pts)
  - Activity: 5 days (20 pts)
  - Close: 45 days (8 pts)
  - TOTAL: 80 = HOT ✅
```

**Actions:**
- Assign top sales rep
- Schedule close meeting
- Address final objections
- Prepare paperwork
- Daily follow-up

### Warm Opportunities (30-70 points)

**Definition:** Actively engaged, needs nurturing

**Characteristics:**
- Medium deal value ($10k-$50k)
- Mid-stage pipeline
- Regular activity (< 30 days)
- Moderate probability (30-75%)
- Medium-term close (30-90 days)

**Example Profiles:**
```
Profile 1 (Growing Interest):
  - Stage: qualified (15 pts)
  - Probability: 45% (9 pts)
  - Deal: $30k (6 pts)
  - Activity: 20 days (15 pts)
  - Close: 60 days (8 pts)
  - TOTAL: 53 = WARM ✅

Profile 2 (Moderate Progress):
  - Stage: proposal (20 pts)
  - Probability: 50% (10 pts)
  - Deal: $75k (20 pts)
  - Activity: 25 days (15 pts)
  - Close: 90 days (6 pts)
  - TOTAL: 71 = HOT (borderline)
```

**Actions:**
- Regular check-ins (weekly)
- Send relevant content
- Schedule demos/meetings
- Address technical questions
- Move to next stage

### Cold Opportunities (0-30 points)

**Definition:** Early stage, needs engagement

**Characteristics:**
- Small deal value ($< 10k) OR
- Early pipeline stage (prospect) OR
- Old activity (> 60 days) OR
- Low probability (< 30%) OR
- Distant close (> 90 days)

**Example Profiles:**
```
Profile 1 (Initial Contact):
  - Stage: prospect (5 pts)
  - Probability: 15% (3 pts)
  - Deal: $5k (10 pts)
  - Activity: None (0 pts)
  - Close: 180 days (1 pt)
  - TOTAL: 19 = COLD ✅

Profile 2 (Stale Opportunity):
  - Stage: qualified (15 pts)
  - Probability: 20% (4 pts)
  - Deal: $20k (4 pts)
  - Activity: 120 days (0 pts)
  - Close: None (0 pts)
  - TOTAL: 23 = COLD ✅
```

**Actions:**
- Initial qualification call
- Discovery meeting
- Send educational content
- Request budget discussion
- Establish timeline

---

## 💡 INTEGRATION EXAMPLES

### Example 1: Lead Scoring on Create

```javascript
// Create new opportunity
const opp = await base44.entities.SalesOpportunity.create({
  workspace_id: 'ws_1',
  contact_id: 'cli_1',
  opportunity_name: 'Enterprise Deal',
  deal_value: 250000,
  pipeline_stage: 'prospect', // Just starting
  conversion_probability: 10,
  expected_close_date: '2026-06-30',
  last_activity_date: '2026-03-10' // Today
});

// Lead score automatically calculated:
// - deal_value: 20 points (large deal)
// - pipeline_stage: 5 points (prospect)
// - probability: 2 points (10%)
// - activity: 20 points (today)
// - close_date: 8 points (110 days)
// - TOTAL: 55 = WARM (needs qualification)

console.log(opp.lead_score); // 55
```

### Example 2: Score Improvement Through Pipeline

```javascript
// Initial state
let opp = await base44.entities.SalesOpportunity.create({
  workspace_id: 'ws_1',
  contact_id: 'cli_1',
  opportunity_name: 'Deal',
  deal_value: 100000,
  pipeline_stage: 'prospect',
  conversion_probability: 10,
  expected_close_date: '2026-06-30',
  last_activity_date: new Date().toISOString().split('T')[0]
});
console.log('Initial score:', opp.lead_score); // ~40 (moderate)

// After qualification
opp = await base44.entities.SalesOpportunity.update(opp.id, {
  pipeline_stage: 'qualified',
  conversion_probability: 40
});
console.log('After qualification:', opp.lead_score); // ~60 (warm)

// After proposal sent
opp = await base44.entities.SalesOpportunity.update(opp.id, {
  pipeline_stage: 'proposal',
  conversion_probability: 65,
  last_activity_date: new Date().toISOString().split('T')[0]
});
console.log('After proposal:', opp.lead_score); // ~78 (hot)

// During negotiation
opp = await base44.entities.SalesOpportunity.update(opp.id, {
  pipeline_stage: 'negotiation',
  conversion_probability: 85,
  expected_close_date: '2026-04-15' // Closer date
});
console.log('During negotiation:', opp.lead_score); // ~88 (hot)

// Closed won
opp = await base44.entities.SalesOpportunity.update(opp.id, {
  pipeline_stage: 'won',
  conversion_probability: 100
});
console.log('Closed won:', opp.lead_score); // 100 (maximum)
```

### Example 3: Activity Tracking Impact

```javascript
// Opportunity scoring low due to inactivity
let opp = {
  opportunity_name: 'Stale Deal',
  deal_value: 50000,
  pipeline_stage: 'qualified',
  conversion_probability: 50,
  last_activity_date: '2025-12-01', // 100 days ago
  expected_close_date: '2026-04-01'
};
// Score: ~25 (COLD - old activity)

// Record activity
opp = await base44.entities.SalesOpportunity.update(opp.id, {
  last_activity_date: '2026-03-10' // Today
});
// Score: ~48 (WARM - activity updated)

// Score improved 23 points just from recording activity!
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Caching Strategy
- Cache lead scores for 60 seconds in React Query
- Recalculate immediately on data change
- Batch updates for multiple opportunities

### Indexing
- Index `workspace_id` for fast tenant filtering
- Index `lead_score` for sorting hot/warm/cold
- Index `pipeline_stage` for stage filtering

### Frontend Optimization
- Use `useMemo` for score calculation
- Debounce input changes to reduce recalculations
- Virtual scrolling for large opportunity lists

---

## 🏆 BEST PRACTICES

1. **Update Activity Regularly:** Every touchpoint should update `last_activity_date`
2. **Honest Probabilities:** Keep `conversion_probability` realistic based on stage
3. **Regular Close Date:** Set `expected_close_date` to make scores meaningful
4. **Monitor Cold Opportunities:** Set alerts for very low scores
5. **Prioritize Hot Opportunities:** Focus sales resources on hot leads

---

## 🔧 TROUBLESHOOTING

### Low Score Not Increasing
**Cause:** Multiple factors pulling score down  
**Solution:** Focus on most impactful factor (stage progression)

### High Deal Value, Low Score
**Cause:** Early stage or no activity  
**Solution:** Record activity and move through qualification

### Score Fluctuates Constantly
**Cause:** Last activity date is calculated dynamically  
**Solution:** Store fixed `last_activity_date`, use auto-update on API

---

**Lead Scoring Guide Version:** 1.0.0  
**Last Updated:** 03/03/2026  
**Status:** ✅ Production Ready