# 🚀 SPRINT 18 - KICKOFF DOCUMENT

**Date:** 03/03/2026 (Immediately after Sprint 17 completion)  
**Sprint:** 18 - SalesOpportunity & Lead Scoring  
**Status:** ⏳ **KICKING OFF**  
**Planned Duration:** 13 hours (04-06/03/2026)  
**Target Completion:** 100% by end of 06/03/2026

---

## 🎯 SPRINT 18 OBJECTIVES

### Primary Goal
Implement complete SalesOpportunity entity with lead scoring, pipeline management, and CRM integration for tracking and managing sales opportunities throughout the customer lifecycle.

### Key Outcomes
✅ SalesOpportunity entity fully implemented  
✅ Lead scoring calculation system  
✅ Sales opportunity tracking & pipeline management  
✅ Integration with Quote & Client entities  
✅ Comprehensive testing (unit + E2E)  
✅ Complete API documentation  
✅ 100% production-ready code  

---

## 📋 SPRINT 18 TASKS (10 Total = 13 hours)

### Phase 1: Entity & Frontend (4 Tasks = 4.5 hours)

| # | Task | Estimate | Dependencies |
|---|------|----------|--------------|
| 1 | SalesOpportunity entity schema | 1h | - |
| 2 | SalesOpportunityForm component | 1.5h | Task 1 |
| 3 | SalesOpportunityList component | 1.5h | Task 1 |
| 4 | Sales page (main interface) | 0.5h | Task 2-3 |

### Phase 2: Backend (2 Tasks = 2 hours)

| # | Task | Estimate | Dependencies |
|---|------|----------|--------------|
| 5 | calculateLeadScore backend function | 1h | Task 1 |
| 6 | SalesOpportunity CRUD validation | 0.5h | Task 1 |

### Phase 3: Testing (2 Tasks = 4.5 hours)

| # | Task | Estimate | Dependencies |
|---|------|----------|--------------|
| 7 | Unit tests (18 scenarios) | 2h | Task 2-6 |
| 8 | E2E tests (20 scenarios) | 2.5h | Task 2-6 |

### Phase 4: Documentation (1 Task = 1 hour)

| # | Task | Estimate | Dependencies |
|---|------|----------|--------------|
| 9 | API documentation | 1h | Task 1-8 |
| 10 | Lead scoring guide | 1h | Task 5 |

---

## 📐 SALESOPPORTUNITY ENTITY SCHEMA DESIGN

### Core Fields

```json
{
  "name": "SalesOpportunity",
  "properties": {
    "workspace_id": "string (REQUIRED)",
    "contact_id": "string (REQUIRED - ref to Client)",
    "opportunity_name": "string (REQUIRED)",
    "deal_value": "number (REQUIRED)",
    "pipeline_stage": "enum: prospect|qualified|proposal|negotiation|won|lost",
    "conversion_probability": "number 0-100 (DEFAULT: 0)",
    "lead_score": "number 0-100 (AUTO-CALCULATED)",
    "expected_close_date": "date",
    "last_activity_date": "date",
    "description": "string",
    "source": "enum: direct|referral|website|inbound|cold_call|other",
    "is_active": "boolean (DEFAULT: true)",
    "quote_id": "string (OPTIONAL - ref to Quote)",
    "related_contacts": "array of contact IDs"
  }
}
```

### Lead Scoring Algorithm

**Scoring Model:**
- Base score: 0-100 points
- Factors:
  - Deal value (0-20 points)
  - Activity recency (0-20 points)
  - Pipeline stage (0-30 points)
  - Conversion probability (0-20 points)
  - Contact engagement (0-10 points)

**Categories:**
- Cold: 0-30 (requires nurturing)
- Warm: 30-70 (ready for engagement)
- Hot: 70-100 (ready to close)

---

## 🎨 FRONTEND ARCHITECTURE

### Component Structure

```
pages/
  └─ Sales.js (main page)

components/dashboard/
  ├─ SalesOpportunityForm.jsx
  │   └─ Dynamic deal value calculator
  │   └─ Lead score display
  │   └─ Pipeline stage selector
  │   └─ Expected close date picker
  │   └─ Description/notes textarea
  │
  ├─ SalesOpportunityList.jsx
  │   └─ Virtual scrolling
  │   └─ Search (name, contact)
  │   └─ Filter (stage, lead_score, source)
  │   └─ Sort (deal_value, probability, stage)
  │   └─ Color-coded pipeline stages
  │   └─ Desktop table + mobile cards
  │
  └─ SalesPipelineChart.jsx (BONUS)
      └─ Visual pipeline representation
      └─ Opportunity distribution
      └─ Revenue by stage

entities/
  └─ SalesOpportunity.json
```

---

## 🔧 BACKEND FUNCTIONS

### 1. calculateLeadScore (1 hour)
**Purpose:** Auto-calculate lead score based on multiple factors

**Function Signature:**
```typescript
calculateLeadScore({
  opportunity_id: string,
  workspace_id: string
})
```

**Returns:**
```typescript
{
  lead_score: number (0-100),
  score_breakdown: {
    deal_value_score: number,
    activity_score: number,
    pipeline_score: number,
    probability_score: number,
    engagement_score: number
  },
  category: "cold|warm|hot"
}
```

**Implementation Points:**
- Fetch opportunity & related data
- Calculate each factor
- Sum weighted scores
- Return breakdown for transparency
- Update opportunity with new score

### 2. validateSalesOpportunityData (0.5 hours)
**Purpose:** Server-side validation

**Validates:**
- Required fields (contact_id, name, deal_value)
- Deal value >= 0
- Valid contact exists
- Valid pipeline stage
- Expected close date logic
- Lead score range (0-100)

---

## 🧪 TESTING STRATEGY

### Unit Tests (18 scenarios)

**SalesOpportunityForm (6 tests)**
- Form renders with all fields
- Contact dropdown loads
- Deal value input
- Pipeline stage selector
- Lead score display
- Expected close date picker

**SalesOpportunityList (6 tests)**
- Load & display opportunities
- Search by name
- Search by contact
- Filter by pipeline stage
- Filter by lead score category
- Sort by deal value

**SalesOpportunity CRUD (6 tests)**
- Create opportunity
- Read/filter opportunities
- Update stage & probability
- Update deal value
- Delete opportunity
- Lead score auto-update

### E2E Tests (20 scenarios)

**Full Workflows:**
- Create → Qualify → Propose → Negotiate → Win/Loss
- Lead scoring throughout lifecycle
- Quote generation from opportunity
- Activity tracking
- Bulk opportunity creation
- Pipeline stage transitions
- Multi-stage workflows
- Performance with large datasets
- Multi-tenancy enforcement
- Error handling

---

## 📊 DESIGN SYSTEM CONSISTENCY

### Components to Use
✅ shadcn/ui Button, Input, Select, Textarea  
✅ Lucide React icons (replace any emojis)  
✅ Tailwind CSS for styling  
✅ Dark mode support (useTheme hook)  
✅ Responsive mobile-first layout  
✅ WCAG 2.1 AA+ accessibility  
✅ ARIA labels on all inputs  
✅ FormField wrapper component  

### Icon Reference
- Pipeline: `Zap` or `TrendingUp`
- Score: `Star` or `Sparkles`
- Activity: `Activity` or `Clock`
- Deal: `DollarSign` or `CreditCard`
- Contact: `User` or `Users`
- Close: `CheckCircle2` or `Trophy`

---

## ⏳ DETAILED TIMELINE (04-06/03/2026)

### Day 1: 04/03 (09:00-13:30) - Phase 1 [4.5h]
```
09:00-10:00 - Task 1: Entity schema ✅
10:00-11:30 - Task 2: SalesOpportunityForm ✅
11:30-13:00 - Task 3: SalesOpportunityList ✅
13:00-13:30 - Task 4: Sales page ✅
13:30-14:30 - Lunch break
```

### Day 2: 04/03 (14:30-17:00) - Phase 2 [2h]
```
14:30-15:30 - Task 5: calculateLeadScore ✅
15:30-16:00 - Task 6: Validation function ✅
16:00-17:00 - Code review & cleanup ✅
```

### Day 3: 05/03 (09:00-14:00) - Phase 3 [4.5h]
```
09:00-11:00 - Task 7: Unit tests (18 scenarios) ✅
11:00-13:30 - Task 8: E2E tests (20 scenarios) ✅
13:30-14:00 - Test review & optimization ✅
```

### Day 4: 05-06/03 (14:00-15:00) - Phase 4 [1h]
```
14:00-14:30 - Task 9: API documentation ✅
14:30-15:00 - Task 10: Lead scoring guide ✅
```

---

## 🔗 INTEGRATION POINTS

### With Existing Entities

**Client Entity**
```
SalesOpportunity.contact_id → Client.id
- Get client info for opportunity
- Track opportunities per client
- Bulk opportunity creation from clients
```

**Quote Entity**
```
SalesOpportunity.quote_id → Quote.id (OPTIONAL)
- Link quote to opportunity
- Auto-create opportunity from quote
- Track quote-to-win conversion
```

**Invoice Entity**
```
After conversion: SalesOpportunity → Quote → Invoice
- Track full sales cycle
- Pipeline-to-revenue mapping
```

**SalesActivity Entity**
```
Log activities for each opportunity:
- Stage changes
- Probability updates
- Quote sent
- Email/call tracked
```

---

## 📈 SUCCESS CRITERIA

### Code Quality
- ✅ Zero build errors/warnings
- ✅ 100% component test coverage
- ✅ No code duplication
- ✅ Comprehensive documentation
- ✅ Clean code practices

### Functionality
- ✅ All CRUD operations work
- ✅ Lead score calculation accurate
- ✅ Pipeline transitions smooth
- ✅ Search/filter responsive
- ✅ Virtual scrolling efficient

### UX/Accessibility
- ✅ Mobile-first responsive
- ✅ WCAG 2.1 AA+ compliant
- ✅ Dark mode 100%
- ✅ Smooth animations
- ✅ Clear error messages

### Testing
- ✅ 18 unit test scenarios
- ✅ 20 E2E test scenarios
- ✅ All tests passing
- ✅ Edge cases covered
- ✅ Performance validated

---

## 🎁 BONUS FEATURES (If Time Permits)

1. **SalesPipelineChart Component** (1h)
   - Visual pipeline stages
   - Opportunity distribution
   - Revenue forecast

2. **Activity Timeline** (1h)
   - Opportunity activity log
   - Stage change history
   - Quick actions

3. **Bulk Actions** (0.5h)
   - Update multiple opportunities
   - Change stage in bulk
   - Export to CSV

---

## 📝 DELIVERABLES CHECKLIST

### To Complete by End of Sprint 18

- [ ] SalesOpportunity entity schema
- [ ] SalesOpportunityForm component
- [ ] SalesOpportunityList component
- [ ] Sales page
- [ ] calculateLeadScore function
- [ ] Validation function
- [ ] 18 unit test scenarios
- [ ] 20 E2E test scenarios
- [ ] API documentation
- [ ] Lead scoring guide
- [ ] Code review & cleanup
- [ ] Zero build errors
- [ ] All tests passing
- [ ] Production-ready code

---

## 🎯 DEFINITION OF DONE

- [x] Code written & tested
- [x] Unit tests passing (>90%)
- [x] E2E tests passing (>90%)
- [x] Code reviewed
- [x] Documentation complete
- [x] Zero build errors
- [x] Dark mode working
- [x] Mobile responsive
- [x] Accessibility compliant
- [x] Performance optimized
- [x] Security validated
- [x] Ready for production

---

## 🚀 STARTUP CHECKLIST

- [x] Previous sprint (Sprint 17) 100% complete
- [x] Design system consistent
- [x] All tools available
- [x] No blockers identified
- [x] Testing infrastructure ready
- [x] Documentation template prepared
- [x] Team aligned on objectives

---

## 📞 EXECUTION NOTES

**Key Points for Sprint 18:**
1. Lead score calculation is critical - test thoroughly
2. Pipeline stage transitions must be validated
3. Opportunity can link to Quote optionally
4. Virtual scrolling for large opportunity lists
5. Keep dark mode consistent
6. Maintain WCAG accessibility
7. Multi-tenancy enforcement
8. Comprehensive error handling
9. Clear API documentation
10. Performance testing for large datasets

---

## 🎊 SPRINT 18 MOTIVATION

This sprint brings a crucial sales management feature - the ability to track opportunities from initial prospect to closed deal. With lead scoring, teams can prioritize their efforts and focus on the most promising deals. This completes the financial management trio:

- Sprint 16: Payment management ✅
- Sprint 17: Quote management ✅
- Sprint 18: Opportunity management ⏳

**Let's execute flawlessly and deliver another 100% complete sprint! 🚀**

---

**Sprint 18 Status:** ⏳ **READY TO KICK OFF**  
**Previous Sprint (17):** ✅ **100% COMPLETE**  
**Target Completion:** 06/03/2026  
**Estimated Effort:** 13 hours  

**Ready to begin! 🚀**