import {
  AdAccount,
  Campaign,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";

import {
  CreateFacebookCampaignParams,
  GetFacebookCampaignParams,
  UpdateFacebookCampaignParams,
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
  fields,
}: GetFacebookCampaignParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const campaign = await new Campaign(campaignId).get(fields as string[]);

  if (!campaign || !campaign._data) {
    console.error("Error fetching Facebook campaign:", campaign);
    throw new Error("Error fetching Facebook campaign");
  }

  return campaign._data;
};

export const updateFacebookCampaign = async ({
  campaignId,
  updatedFields,
  facebookAccessToken,
}: UpdateFacebookCampaignParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const campaign = new Campaign(
    campaignId,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  const {
    buyingType,
    dailyBudget,
    specialAdCategories,
    startTime,
    ...restFields
  } = updatedFields;

  const updateResult = campaign.update(Object.keys(updatedFields), {
    ...restFields,
    [Campaign.Fields.buying_type]: buyingType,
    [Campaign.Fields.daily_budget]: dailyBudget,
    [Campaign.Fields.special_ad_categories]: specialAdCategories,
    [Campaign.Fields.start_time]: startTime,
  });

  return updateResult;
};

export const deleteFacebookCampaign = async ({
  campaignId,
  facebookAccessToken,
}) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const campaign = new Campaign(
    campaignId,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  const deleteResult = await campaign.delete(campaignId);

  return deleteResult;
};

export const getAllFacebookCampaigns = async ({
  facebookAccessToken,
  adAccountId,
  fields,
}: {
  facebookAccessToken: string;
  adAccountId: string;
  fields?: string[];
}) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const adAccount = new AdAccount(adAccountId);
  const campaigns = await adAccount.getCampaigns(fields as string[]);

  if (!campaigns || !campaigns.length) {
    console.error("No Facebook campaigns found.");
    return [];
  }

  return campaigns.map((campaign) => campaign._data);
};
