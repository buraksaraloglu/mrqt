import {
  createLocalFacebookCampaign,
  deleteLocalFacebookCampaign,
  getAllLocalCampaigns,
  getLocalFacebookCampaign,
  updateLocalFacebookCampaign,
} from "../model/campaign";
import {
  createFacebookCampaign,
  deleteFacebookCampaign,
  getAllFacebookCampaigns,
  getFacebookCampaign,
  updateFacebookCampaign,
} from "../service/campaign";
import { FacebookCampaignParams, UpdateFacebookCampaignParams } from "../types";

type CreateCampaignHandlerParams = {
  campaign: FacebookCampaignParams;
  facebookAccessToken: string;
  adAccountId: string;
  userId: string;
};

type GetCampaignHandlerParams = {
  campaignId: string;
  facebookAccessToken: string;
  fields?: string[];
};

export const createCampaignHandler = async ({
  campaign,
  ...rest
}: CreateCampaignHandlerParams) => {
  const createdCampaignId = await createFacebookCampaign({
    campaign,
    ...rest,
  });
  const localCampaign = await createLocalFacebookCampaign({
    ...rest,
    campaign,
    facebookCampaignId: createdCampaignId,
  });
  return localCampaign;
};

export const getFacebookCampaignHandler = async ({
  campaignId,
  facebookAccessToken,
  fields,
}: GetCampaignHandlerParams) => {
  const facebookCampaign = await getFacebookCampaign({
    campaignId,
    facebookAccessToken,
    fields,
  });

  const localCampaign = await getLocalFacebookCampaign({
    facebookCampaignId: facebookCampaign.id,
  });

  const combinedData = {
    facebookCampaign,
    localCampaign,
  };

  return combinedData;
};

export const updateCampaignHandler = async ({
  campaignId,
  updatedFields,
  facebookAccessToken,
}: UpdateFacebookCampaignParams) => {
  const localUpdatedCampaign = await updateLocalFacebookCampaign({
    campaignId: campaignId as string,
    updatedFields,
  });

  const updatedFacebookCampaign = await updateFacebookCampaign({
    campaignId: campaignId,
    updatedFields,
    facebookAccessToken,
  });

  const combinedData = {
    localUpdatedCampaign,
    updatedFacebookCampaign,
  };

  return combinedData;
};

export const deleteCampaignHandler = async ({
  campaignId,
  facebookAccessToken,
}) => {
  const deletedFacebookCampaign = await deleteFacebookCampaign({
    campaignId,
    facebookAccessToken,
  });

  await deleteLocalFacebookCampaign({
    facebookCampaignId: campaignId,
  });

  return deletedFacebookCampaign._data.id;
};

export const getAllCampaignsHandler = async ({
  facebookAccessToken,
  adAccountId,
}) => {
  const facebookCampaigns = await getAllFacebookCampaigns({
    facebookAccessToken,
    adAccountId,
  });

  const localCampaigns = await getAllLocalCampaigns(adAccountId);

  const combinedData = {
    facebookCampaigns,
    localCampaigns,
  };

  return combinedData;
};
