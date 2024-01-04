import { createLocalFacebookCampaign } from "../model/campaign";
import { createFacebookCampaign } from "../service/campaign";
import { FacebookCampaignParams } from "../types";

type CreateCampaignHandlerParams = {
  campaign: FacebookCampaignParams;
  facebookAccessToken: string;
  adAccountId: string;
  userId: string;
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
