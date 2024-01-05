import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

import { CreateFacebookAdParams, FacebookAdParams } from "../types";

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
