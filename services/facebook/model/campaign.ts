import { prisma } from "@/lib/db";

import { CreateFacebookCampaignParams } from "../types";

export const createLocalFacebookCampaign = async ({
  campaign,
  facebookCampaignId,
  adAccountId,
}: CreateFacebookCampaignParams & { facebookCampaignId: string }) => {
  const localCampaign = await prisma.facebookCampaign.create({
    data: {
      name: campaign.name,
      campaignType: campaign.campaign_type,
      dailyBudget: campaign.daily_budget,
      status: campaign.status,
      buyingType: campaign.buying_type,
      target: campaign.target,
      specialAdCategories: campaign.special_ad_categories,
      objective: campaign.objective,
      id: facebookCampaignId,
      facebookAdAccount: {
        connect: {
          id: adAccountId,
        },
      },
    },
  });

  return localCampaign;
};
