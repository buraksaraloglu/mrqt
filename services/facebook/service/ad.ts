import { AdAccount, FacebookAdsApi } from "facebook-nodejs-business-sdk";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";

import { AdParams } from "../interfaces";

const FacebookAdsApiInstance = FacebookAdsApi.init(env.FACEBOOK_ACCESS_TOKEN);

export const createAd = async (
  ad: AdParams & {
    facebookAdSetId: string;
    existingAdSetId: number;
  },
) => {
  try {
    const { facebookAdSetId, existingAdSetId, ...adParams } = ad;

    const account = new AdAccount(
      env.FACEBOOK_ACCOUNT_ID,
      FacebookAdsApiInstance,
    );

    const adParamsWithIds: AdParams = {
      ...adParams,
      adset_id: facebookAdSetId,
    };

    const createdAd = await account.createAd([], adParamsWithIds);

    const facebookAdId = createdAd.id;

    // const newAdInDB = await prisma.ad.create({
    //   data: {
    //     ...adParams,
    //     adset_id: facebookAdSetId,
    //     adSetId: existingAdSetId,
    //     ad_id: facebookAdId,
    //   },
    // });

    // return newAdInDB;
    return facebookAdId;
  } catch (error) {
    console.error("Error creating Ad:", error);
    throw error;
  }
};

export const getAd = async (ad_ids: string[]) => {
  try {
    const account = new AdAccount(
      env.FACEBOOK_ACCOUNT_ID,
      FacebookAdsApiInstance,
    );

    const fbAds = await Promise.all(
      ad_ids.map(async (id) => {
        try {
          return await account.get([AdAccount.Fields.name], {
            fields: ["name"],
            params: { ad_ids: [id] },
          });
        } catch (error) {
          console.error(`Error fetching ad data for ad_id ${id}:`, error);
          return null;
        }
      }),
    );

    return fbAds.filter((result) => result !== null);
  } catch (error) {
    console.error("Error fetching ad data:", error);
    return [];
  }
};
