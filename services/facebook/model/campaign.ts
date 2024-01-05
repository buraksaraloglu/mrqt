import { prisma } from "@/lib/db";

import {
  CreateFacebookCampaignParams,
  UpdateFacebookCampaignParams,
} from "../types";

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

export const updateLocalFacebookCampaign = async ({
  campaignId,
  updatedFields,
}: UpdateFacebookCampaignParams & { campaignId: string }) => {
  return prisma.facebookCampaign.update({
    where: {
      id: campaignId,
    },
    data: updatedFields,
  });
};

export const deleteLocalFacebookCampaign = async ({
  facebookCampaignId,
}: {
  facebookCampaignId: string;
}) => {
  return prisma.facebookCampaign.delete({
    where: {
      id: facebookCampaignId,
    },
  });
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
