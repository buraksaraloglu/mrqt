import { AdAccount, FacebookAdsApi } from "facebook-nodejs-business-sdk";

import { CreateFacebookAdParams } from "../types";

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
