import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

import {
  CreateFacebookAdParams,
  FacebookAdParams,
  UpdateFacebookAdParams,
} from "../types";

export const createLocalFacebookAd = async ({
  ad,
  facebookAdId,
  adSetId,
}: CreateFacebookAdParams & {
  facebookAdId: string;
}) => {
  const localAd = await prisma.facebookAd.create({
    data: {
      name: ad.name,
      status: ad.status,
      creative: ad.creative as unknown as Prisma.JsonObject,
      id: facebookAdId,
      facebookAdSet: {
        connect: {
          id: adSetId,
        },
      },
    },
  });

  return localAd;
};

export const getLocalFacebookAd = async ({
  facebookAdId,
}: {
  facebookAdId: string;
}) => {
  const localAd = await prisma.facebookAd.findUnique({
    where: {
      id: facebookAdId,
    },
  });

  if (!localAd) {
    throw new Error(`Local Facebook Ad not found with id: ${facebookAdId}`);
  }

  return localAd;
};

export const updateLocalFacebookAd = async ({
  adId,
  updatedFields,
}: UpdateFacebookAdParams & { adId: string }) => {
  return prisma.facebookAd.update({
    where: {
      id: adId,
    },
    data: updatedFields,
  });
};
