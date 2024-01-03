import { z } from "zod";

import { prisma } from "@/lib/db";

import { createLocalFacebookCampaign } from "../model/campaign";
import { createFacebookCampaign } from "../service/campaign";
import { FacebookCampaignParams } from "../types";

type CreateCampaignHandlerParams = {
  campaign: FacebookCampaignParams;
  facebookAccessToken: string;
  adAccountId: string;
  userId: string;
};

const campaignSchema = z.object({
  name: z.string(),
  status: z.string(),
  buying_type: z.string(),
  objective: z.string(),
  special_ad_categories: z.string(),
  daily_budget: z.number(),
  target: z.array(z.record(z.string(), z.any())),
  campaign_type: z.string(),
});

const createCampaignSchema = z.object({
  campaign: campaignSchema,
});

export const validateCampaignInput = (formData: FormData) => {
  const { campaign } = createCampaignSchema.parse(formData);
  return campaign;
};

export const createCampaignHandler = async ({
  campaign,
  ...rest
}: CreateCampaignHandlerParams) => {
  const createdCampaignId = await createFacebookCampaign({
    campaign,
    ...rest,
  });
  const localCampaign = await createLocalFacebookCampaign({
    ...rest,
    campaign,
    facebookCampaignId: createdCampaignId,
  });
  return localCampaign;
};

// export const getCampaignHandler = async (
//   req: Request,
//   res: Response,
//   isNestedCall: boolean = false,
// ) => {
//   try {
//     const { campaign_ids } = req.body;

//     const dbCampaign = campaign_ids
//       ? await prisma.campaign.findMany({
//           where: { campaign_id: { in: campaign_ids } },
//         })
//       : [];

//     const fbCampaign = campaign_ids ? await getCampaign(campaign_ids) : [];

//     if (isNestedCall) {
//       return { dbCampaign, fbCampaign };
//     } else {
//       res.json({ dbCampaign, fbCampaign });
//     }
//   } catch (error) {
//     console.error("Error fetching campaign data:", error);
//     next(error);
//   }
// };
