import { Ad, AdAccount, FacebookAdsApi } from "facebook-nodejs-business-sdk";

import { CreateFacebookAdParams, GetFacebookAdParams } from "../types";

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
