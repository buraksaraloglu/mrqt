import {
  createLocalFacebookAd,
  deleteLocalFacebookAd,
  getLocalFacebookAd,
  updateLocalFacebookAd,
} from "../model/ad";
import { updateLocalFacebookAdSet } from "../model/ad-set";
import {
  createFacebookAd,
  deleteFacebookAd,
  getFacebookAd,
  updateFacebookAd,
} from "../service/ad";
import { UpdateFacebookAdParams } from "../types";

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

export const updateAdHandler = async ({
  adId,
  updatedFields,
  facebookAccessToken,
}: UpdateFacebookAdParams) => {
  const localUpdatedAdSet = await updateLocalFacebookAd({
    adId: adId as string,
    updatedFields,
  });

  const updatedFacebookAdSet = await updateFacebookAd({
    adId,
    updatedFields,
    facebookAccessToken,
  });

  const combinedData = {
    localUpdatedAdSet,
    updatedFacebookAdSet,
  };

  return combinedData;
};

export const deleteAdHandler = async ({ adId, facebookAccessToken }) => {
  const deletedFacebookAd = await deleteFacebookAd({
    adId,
    facebookAccessToken,
  });

  await deleteLocalFacebookAd({
    facebookAdId: adId,
  });

  return deletedFacebookAd;
};
