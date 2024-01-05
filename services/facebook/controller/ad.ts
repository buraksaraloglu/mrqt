import { createLocalFacebookAd, getLocalFacebookAd } from "../model/ad";
import { createFacebookAd, getFacebookAd } from "../service/ad";
import { CreateFacebookAdParams, FacebookAdParams } from "../types";

type CreateAdHandlerParams = {
  ad: any;
  facebookAccessToken: string;
  adAccountId: string;
  userId: string;
  adSetId: string;
};

type GetAdHandlerParams = {
  adId: string;
  facebookAccessToken: string;
};

export const createAdHandler = async ({
  ad,
  ...rest
}: CreateAdHandlerParams) => {
  const createdAdId = await createFacebookAd({
    ad,
    ...rest,
  });

  const localAd = await createLocalFacebookAd({
    ...rest,
    ad,
    facebookAdId: createdAdId,
  });

  return localAd;
};

export const getFacebookAdHandler = async ({
  adId,
  facebookAccessToken,
}: GetAdHandlerParams) => {
  const facebookAd = await getFacebookAd({
    adId,
    facebookAccessToken,
  });

  const localAd = await getLocalFacebookAd({
    facebookAdId: facebookAd.id,
  });

  const combinedData = {
    facebookAd,
    localAd,
  };

  return combinedData;
};
