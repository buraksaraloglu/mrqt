import {
  createLocalFacebookCampaign,
  getAllLocalCampaigns,
  getLocalFacebookCampaign,
} from "../model/campaign";
import {
  createFacebookCampaign,
  getAllFacebookCampaigns,
  getFacebookCampaign,
} from "../service/campaign";
import { FacebookCampaignParams } from "../types";

type CreateCampaignHandlerParams = {
  campaign: FacebookCampaignParams;
  facebookAccessToken: string;
  adAccountId: string;
  userId: string;
};

type GetCampaignHandlerParams = {
  campaignId: string;
  facebookAccessToken: string;
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
}: GetCampaignHandlerParams) => {
  const facebookCampaign = await getFacebookCampaign({
    campaignId,
    facebookAccessToken,
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
