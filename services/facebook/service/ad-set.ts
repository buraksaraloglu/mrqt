import {
  AdAccount,
  AdSet,
  Campaign,
  FacebookAdsApi,
} from "facebook-nodejs-business-sdk";

import {
  CreateFacebookAdSetParams,
  GetFacebookAdSetParams,
  UpdateFacebookAdSetParams,
} from "../types";

export const createFacebookAdSet = async ({
  adSet,
  adAccountId,
  facebookAccessToken,
}: CreateFacebookAdSetParams) => {
  const account = new AdAccount(
    adAccountId,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  const createdAdSet = await account.createAdSet([], {
    ...adSet,
  });

  const facebookAdSetId = createdAdSet._data.id;

  if (!facebookAdSetId || typeof facebookAdSetId !== "string") {
    throw new Error("No Facebook Ad Set ID created");
  }
  return facebookAdSetId;
};

export const getFacebookAdSet = async ({
  adSetId,
  facebookAccessToken,
  fields,
}: GetFacebookAdSetParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const adSet = await new AdSet(adSetId).get(fields as string[]);

  if (!adSet || !adSet._data) {
    console.error("Error fetching Facebook Ad Set:", adSet);
    throw new Error("Error fetching Facebook Ad Set");
  }

  return adSet._data;
};

export const updateFacebookAdSet = async ({
  adSetId,
  updatedFields,
  facebookAccessToken,
}: UpdateFacebookAdSetParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const adSet = new AdSet(adSetId, FacebookAdsApi.init(facebookAccessToken!));

  const { bidAmount, billingEvent, ...restFields } = updatedFields;
  const updateResult = adSet.update(Object.keys(updatedFields), {
    ...restFields,
    [AdSet.Fields.bid_amount]: bidAmount,
    [AdSet.Fields.billing_event]: billingEvent,
  });

  return updateResult;
};

export const deleteFacebookAdSet = async ({ adSetId, facebookAccessToken }) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const adSet = new AdSet(adSetId, FacebookAdsApi.init(facebookAccessToken!));

  const deleteResult = await adSet.delete(adSetId);

  return deleteResult;
};
