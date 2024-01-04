import {
  AdAccount,
  Campaign,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";

import { prisma } from "@/lib/db";

import {
  CreateFacebookCampaignParams,
  GetFacebookCampaignParams,
} from "../types";

export const createFacebookCampaign = async ({
  campaign,
  adAccountId,
  facebookAccessToken,
}: CreateFacebookCampaignParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const account = new AdAccount(
    adAccountId,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  const createdCampaign = await account.createCampaign([], campaign);
  const facebookCampaignId = createdCampaign._data.id;

  if (!facebookCampaignId || typeof facebookCampaignId !== "string") {
    throw new Error("No facebook campaignId created");
  }
  return facebookCampaignId;
};

export const getFacebookCampaign = async ({
  campaignId,
  facebookAccessToken,
}: GetFacebookCampaignParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const fields = ["id", "name", "objective", "daily_budget"];

  const campaign = await new Campaign(campaignId).get(fields);

  if (!campaign || !campaign._data) {
    console.error("Error fetching Facebook campaign:", campaign);
    throw new Error("Error fetching Facebook campaign");
  }

  return campaign._data;
};

export const getAllFacebookCampaigns = async ({
  facebookAccessToken,
  adAccountId,
}) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const fields = ["id", "name", "objective", "daily_budget"];

  const adAccount = new AdAccount(adAccountId);
  const campaigns = await adAccount.getCampaigns(fields);

  if (!campaigns || !campaigns.length) {
    console.error("No Facebook campaigns found.");
    return [];
  }

  return campaigns.map((campaign) => campaign._data);
};
