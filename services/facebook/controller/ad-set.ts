import {
  createLocalFacebookAdSet,
  deleteLocalFacebookAdSet,
  getLocalFacebookAdSet,
  updateLocalFacebookAdSet,
} from "../model/ad-set";
import {
  createFacebookAdSet,
  deleteFacebookAdSet,
  getFacebookAdSet,
  updateFacebookAdSet,
} from "../service/ad-set";
import { FacebookAdSetParams, UpdateFacebookAdSetParams } from "../types";

type CreateAdSetHandlerParams = {
  adSet: any;
  facebookAccessToken: string;
  adAccountId: string;
  campaignId: string;
  userId: string;
};

type GetAdSetHandlerParams = {
  adSetId: string;
  facebookAccessToken: string;
};

export const createAdSetHandler = async ({
  adSet,
  ...rest
}: CreateAdSetHandlerParams) => {
  const createdAdSetId = await createFacebookAdSet({
    adSet,
    ...rest,
  });
  const localAdSet = await createLocalFacebookAdSet({
    ...rest,
    adSet,
    facebookAdSetId: createdAdSetId,
  });
  return localAdSet;
};

export const getFacebookAdSetHandler = async ({
  adSetId,
  facebookAccessToken,
}: GetAdSetHandlerParams) => {
  const facebookAdSet = await getFacebookAdSet({
    adSetId,
    facebookAccessToken,
  });

  const localAdSet = await getLocalFacebookAdSet({
    facebookAdSetId: facebookAdSet.id,
  });

  const combinedData = {
    facebookAdSet,
    localAdSet,
  };

  return combinedData;
};

export const updateAdSetHandler = async ({
  adSetId,
  updatedFields,
  facebookAccessToken,
}: UpdateFacebookAdSetParams) => {
  const localUpdatedAdSet = await updateLocalFacebookAdSet({
    adSetId: adSetId as string,
    updatedFields,
  });

  const updatedFacebookAdSet = await updateFacebookAdSet({
    adSetId: adSetId,
    updatedFields,
    facebookAccessToken,
  });

  const combinedData = {
    localUpdatedAdSet,
    updatedFacebookAdSet,
  };

  return combinedData;
};

export const deleteAdSetHandler = async ({ adSetId, facebookAccessToken }) => {
  const deletedFacebookAdSet = await deleteFacebookAdSet({
    adSetId,
    facebookAccessToken,
  });

  await deleteLocalFacebookAdSet({
    facebookAdSetId: adSetId,
  });

  return deletedFacebookAdSet;
};
