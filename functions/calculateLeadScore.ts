import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Calculate lead score (0-100) based on multiple factors
 * Scoring breakdown:
 * - 20% Profile Completeness
 * - 15% Activity Level
 * - 15% Engagement
 * - 20% Deal Value
 * - 30% Recency
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workspace_id, opportunity_id } = await req.json();

    if (!workspace_id || !opportunity_id) {
      return Response.json(
        { error: 'workspace_id and opportunity_id required' },
        { status: 400 }
      );
    }

    // Fetch opportunity
    const opp = await base44.entities.SalesOpportunity.list();
    const opportunity = opp?.find(o => o.id === opportunity_id && o.workspace_id === workspace_id);

    if (!opportunity) {
      return Response.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    // Fetch contact
    const contacts = await base44.entities.Client.list();
    const contact = contacts?.find(c => c.id === opportunity.contact_id);

    if (!contact) {
      return Response.json({ error: 'Contact not found' }, { status: 404 });
    }

    // 1. Profile Completeness (20%)
    const requiredFields = ['company_name', 'email', 'phone', 'cep'];
    const completedFields = requiredFields.filter(f => contact[f] && contact[f].toString().trim()).length;
    const completenessScore = (completedFields / requiredFields.length) * 100;

    // 2. Activity Level (15%) - based on last activity recency
    const lastActivity = opportunity.last_activity_date;
    let activityScore = 0;
    if (lastActivity) {
      const daysAgo = Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24));
      if (daysAgo <= 7) activityScore = 100;
      else if (daysAgo <= 14) activityScore = 80;
      else if (daysAgo <= 30) activityScore = 60;
      else if (daysAgo <= 60) activityScore = 40;
      else activityScore = 20;
    } else {
      activityScore = 10;
    }

    // 3. Engagement (15%) - based on activities and notes
    const activities = await base44.entities.ContactActivity.filter({ contact_id: opportunity.contact_id });
    const notes = await base44.entities.ContactNote.filter({ contact_id: opportunity.contact_id });
    const engagementScore = Math.min(100, ((activities?.length || 0) + (notes?.length || 0)) * 5);

    // 4. Deal Value (20%) - normalized
    const dealValueNormalized = Math.min(100, (opportunity.deal_value / 100000) * 100);

    // 5. Recency (30%) - days since creation
    const createdDate = opportunity.created_date || new Date().toISOString();
    const daysOld = Math.floor((Date.now() - new Date(createdDate).getTime()) / (1000 * 60 * 60 * 24));
    let recencyScore = 100;
    if (daysOld > 30) recencyScore = Math.max(20, 100 - (daysOld * 2));

    // Calculate weighted score
    const score = Math.round(
      (completenessScore * 0.20) +
      (activityScore * 0.15) +
      (engagementScore * 0.15) +
      (dealValueNormalized * 0.20) +
      (recencyScore * 0.30)
    );

    // Update opportunity with score
    await base44.entities.SalesOpportunity.update(opportunity_id, {
      lead_score: Math.min(100, Math.max(0, score))
    });

    return Response.json({
      opportunity_id,
      score: Math.min(100, Math.max(0, score)),
      factors: {
        completeness: Math.round(completenessScore),
        activity: Math.round(activityScore),
        engagement: Math.round(engagementScore),
        deal_value: Math.round(dealValueNormalized),
        recency: Math.round(recencyScore)
      }
    });
  } catch (error) {
    console.error('Lead score calculation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});