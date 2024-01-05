import { createLocalFacebookAd } from "../model/ad";
import { createFacebookAd } from "../service/ad";
import { CreateFacebookAdParams, FacebookAdParams } from "../types";

type CreateAdHandlerParams = {
  ad: any;
  facebookAccessToken: string;
  adAccountId: string;
  userId: string;
  adSetId: string;
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
