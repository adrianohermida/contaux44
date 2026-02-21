import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { workspace_id, loyalty_program_id } = await req.json();
    
    if (!workspace_id || !loyalty_program_id) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Fetch program and members
    const programs = await base44.asServiceRole.entities.LoyaltyProgram.filter({
      workspace_id,
      id: loyalty_program_id
    });

    if (!programs || programs.length === 0) {
      return Response.json({ error: 'Program not found' }, { status: 404 });
    }

    const program = programs[0];
    const members = await base44.asServiceRole.entities.CustomerPoints.filter({
      workspace_id,
      loyalty_program_id
    });

    if (!program.tier_system || !program.tiers || members.length === 0) {
      return Response.json({ member_updates: [] });
    }

    // Calculate tier for each member
    const updates = members.map(member => {
      let currentTier = member.tier || 'bronze';
      
      // Find appropriate tier based on lifetime points
      for (const tier of program.tiers) {
        if (member.lifetime_points >= tier.min_points) {
          currentTier = tier.name;
        }
      }

      return {
        contact_id: member.contact_id,
        new_tier: currentTier,
        tier_changed: currentTier !== member.tier
      };
    });

    return Response.json({ member_updates: updates });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});