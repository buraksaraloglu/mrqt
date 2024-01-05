import { Ad, AdAccount, FacebookAdsApi } from "facebook-nodejs-business-sdk";

import {
  CreateFacebookAdParams,
  GetFacebookAdParams,
  UpdateFacebookAdParams,
} from "../types";

export const createFacebookAd = async ({
  ad,
  adAccountId,
  facebookAccessToken,
}: CreateFacebookAdParams) => {
  const account = new AdAccount(
    adAccountId,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  const createdAd = await account.createAd([], {
    ...ad,
  });

  const facebookAdId = createdAd._data.id;

  if (!facebookAdId || typeof facebookAdId !== "string") {
    throw new Error("No Facebook Ad ID created");
  }
  return facebookAdId;
};

export const getFacebookAd = async ({
  adId,
  facebookAccessToken,
  fields,
}: GetFacebookAdParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const ad = await new Ad(adId).get(fields as string[]);

  if (!ad || !ad._data) {
    console.error("Error fetching Facebook Ad:", ad);
    throw new Error("Error fetching Facebook Ad");
  }

  return ad._data;
};

export const updateFacebookAd = async ({
  adId,
  updatedFields,
  facebookAccessToken,
}: UpdateFacebookAdParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const ad = new Ad(adId, FacebookAdsApi.init(facebookAccessToken!));

  const { ...restFields } = updatedFields;

  const updateResult = await ad.update(Object.keys(updatedFields), {
    ...restFields,
  });

  return updateResult;
};

export const deleteFacebookAd = async ({ adId, facebookAccessToken }) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const ad = new Ad(adId, FacebookAdsApi.init(facebookAccessToken!));

  const deleteResult = await ad.delete(adId);

  return deleteResult;
};
