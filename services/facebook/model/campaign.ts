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

export const getLocalFacebookCampaign = async ({
  facebookCampaignId,
}: {
  facebookCampaignId: string;
}) => {
  const localCampaign = await prisma.facebookCampaign.findUnique({
    where: {
      id: facebookCampaignId,
    },
  });

  return localCampaign;
};

export const getAllLocalCampaigns = async ({
  adAccountId,
}: {
  adAccountId: string;
}) => {
  try {
    const localCampaigns = await prisma.facebookCampaign.findMany({
      where: {
        facebookAdAccountId: adAccountId,
      },
    });
    return localCampaigns;
  } catch (error) {
    console.error("Error fetching local campaigns from the database:", error);
    throw new Error("Error fetching local campaigns");
  }
};
