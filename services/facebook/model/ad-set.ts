import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

import {
  CreateFacebookAdSetParams,
  FacebookAdSetParams,
  FacebookCampaignParams,
  UpdateFacebookAdSetParams,
} from "../types";

export const createLocalFacebookAdSet = async ({
  adSet,
  facebookAdSetId,
  campaignId,
}: CreateFacebookAdSetParams & {
  facebookAdSetId: string;
  adSet: FacebookAdSetParams;
}) => {
  const localAdSet = await prisma.facebookAdSet.create({
    data: {
      name: adSet.name,
      status: adSet.status,
      targeting: adSet.targeting as unknown as Prisma.JsonObject,
      billingEvent: adSet.billing_event,
      bidAmount: adSet.bid_amount,
      id: facebookAdSetId,
      facebookCampaign: {
        connect: {
          id: campaignId,
        },
      },
    },
  });

  return localAdSet;
};

export const getLocalFacebookAdSet = async ({
  facebookAdSetId,
}: {
  facebookAdSetId: string;
}) => {
  const localAdSet = await prisma.facebookAdSet.findUnique({
    where: {
      id: facebookAdSetId,
    },
  });

  return localAdSet;
};

export const updateLocalFacebookAdSet = async ({
  adSetId,
  updatedFields,
}: UpdateFacebookAdSetParams & { adSetId: string }) => {
  return prisma.facebookAdSet.update({
    where: {
      id: adSetId,
    },
    data: updatedFields,
  });
};

export const deleteLocalFacebookAdSet = async ({
  facebookAdSetId,
}: {
  facebookAdSetId: string;
}) => {
  return prisma.facebookAdSet.delete({
    where: {
      id: facebookAdSetId,
    },
  });
};
