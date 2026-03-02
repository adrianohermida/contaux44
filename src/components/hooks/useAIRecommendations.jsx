/**
 * useAIRecommendations Hook
 * Generate AI-powered smart recommendations
 */

import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function useAIRecommendations(workspaceId, entityType = 'contact') {
  // Fetch entity data for analysis
  const { data: entities = [] } = useQuery({
    queryKey: ['entities-for-recommendations', workspaceId, entityType],
    queryFn: async () => {
      // In production, fetch from base44 entities
      return [];
    },
    enabled: !!workspaceId,
  });

  // Generate contact recommendations
  const generateContactRecommendations = useCallback(async (contact) => {
    const recommendations = [];

    // Recommendation 1: Follow-up timing
    if (contact.last_activity_date) {
      const daysSinceContact = Math.floor(
        (Date.now() - new Date(contact.last_activity_date).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysSinceContact > 7) {
        recommendations.push({
          id: 'followup-timing',
          type: 'follow-up',
          title: 'Time to Follow Up',
          description: `${daysSinceContact} days since last contact. Send a follow-up message.`,
          action: 'Follow Up',
          confidence: 0.85,
          icon: 'MessageCircle',
        });
      }
    }

    // Recommendation 2: Deal opportunity
    if (contact.status === 'active' && contact.lead_score > 70) {
      recommendations.push({
        id: 'deal-opportunity',
        type: 'opportunity',
        title: 'Sales Opportunity',
        description: 'High engagement score. Consider creating a sales opportunity.',
        action: 'Create Opportunity',
        confidence: 0.75,
        icon: 'TrendingUp',
      });
    }

    // Recommendation 3: Data enrichment
    if (!contact.company_name || !contact.phone) {
      recommendations.push({
        id: 'data-enrichment',
        type: 'data',
        title: 'Complete Contact Information',
        description: 'Missing key contact details. Enrich this contact.',
        action: 'Enrich Data',
        confidence: 0.9,
        icon: 'Info',
      });
    }

    // Recommendation 4: Engagement opportunity
    if (contact.status === 'active' && contact.email) {
      recommendations.push({
        id: 'engagement-campaign',
        type: 'campaign',
        title: 'Engagement Campaign',
        description: 'High-value contact. Include in next marketing campaign.',
        action: 'Add to Campaign',
        confidence: 0.65,
        icon: 'Send',
      });
    }

    return recommendations;
  }, []);

  // Generate sales opportunity recommendations
  const generateOpportunityRecommendations = useCallback(async (opportunity) => {
    const recommendations = [];

    // Recommendation 1: Proposal timeline
    if (opportunity.expected_close_date) {
      const daysUntilClose = Math.floor(
        (new Date(opportunity.expected_close_date).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysUntilClose <= 7 && daysUntilClose >= 0) {
        recommendations.push({
          id: 'close-timeline',
          type: 'urgent',
          title: 'Deal Closing Soon',
          description: `${daysUntilClose} days until expected close. Follow up with proposal.`,
          action: 'Send Proposal',
          confidence: 0.95,
          icon: 'AlertCircle',
        });
      }
    }

    // Recommendation 2: Stage advancement
    if (opportunity.pipeline_stage === 'proposal' && opportunity.conversion_probability < 50) {
      recommendations.push({
        id: 'stage-advancement',
        type: 'process',
        title: 'Boost Win Probability',
        description: 'Low win probability. Schedule a discovery call to better understand needs.',
        action: 'Schedule Call',
        confidence: 0.7,
        icon: 'Phone',
      });
    }

    // Recommendation 3: Competitor activity
    if (opportunity.pipeline_stage === 'negotiation') {
      recommendations.push({
        id: 'competitor-response',
        type: 'risk',
        title: 'Competitive Risk Detected',
        description: 'High-value deal in negotiation. Monitor for competitor activity.',
        action: 'Review Risk',
        confidence: 0.6,
        icon: 'AlertTriangle',
      });
    }

    return recommendations;
  }, []);

  // Get recommendation confidence score color
  const getConfidenceColor = useCallback((confidence) => {
    if (confidence >= 0.85) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (confidence >= 0.7) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  }, []);

  // Get recommendation icon
  const getRecommendationIcon = useCallback((iconName) => {
    const icons = {
      MessageCircle: 'Message',
      TrendingUp: 'TrendingUp',
      Info: 'Info',
      Send: 'Send',
      AlertCircle: 'AlertCircle',
      Phone: 'Phone',
      AlertTriangle: 'AlertTriangle',
    };
    return icons[iconName] || 'Lightbulb';
  }, []);

  // Get summary of recommendations
  const getRecommendationsSummary = useCallback((recommendations) => {
    return {
      total: recommendations.length,
      highConfidence: recommendations.filter((r) => r.confidence >= 0.85).length,
      mediumConfidence: recommendations.filter(
        (r) => r.confidence >= 0.7 && r.confidence < 0.85
      ).length,
      lowConfidence: recommendations.filter((r) => r.confidence < 0.7).length,
      byType: recommendations.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      }, {}),
    };
  }, []);

  return {
    entities,
    generateContactRecommendations,
    generateOpportunityRecommendations,
    getConfidenceColor,
    getRecommendationIcon,
    getRecommendationsSummary,
  };
}

export default useAIRecommendations;