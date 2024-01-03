import { AdAccount, FacebookAdsApi } from "facebook-nodejs-business-sdk";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

import { getFacebookToken } from "../lib";
import { CreateFacebookCampaignParams, FacebookCampaignParams } from "../types";

export const createFacebookCampaign = async ({
  campaign,
  adAccountId,
  facebookAccessToken,
}: CreateFacebookCampaignParams) => {
  const specialAdCategoriesString = JSON.stringify(
    campaign.special_ad_categories || "",
  );

  FacebookAdsApi.init(facebookAccessToken!);

  const account = new AdAccount(
    adAccountId,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  const campaignParams: FacebookCampaignParams = {
    ...campaign,

    special_ad_categories: JSON.parse(specialAdCategoriesString || "[]"),
  };

  const createdCampaign = await account.createCampaign([], campaignParams);
  const facebookCampaignId = createdCampaign._data.id;

  if (!facebookCampaignId || typeof facebookCampaignId !== "string") {
    throw new Error("No facebook campaignId found");
  }
  return facebookCampaignId;
};

// export const getCampaign = async (
//   campaign_ids: string[],
//   accountId?: campaignTypes["accountId"],
// ) => {
//   try {
//     const user = await requireUser();
//     const facebookAccessToken = await getFacebookToken(user.id);

//     const account = new AdAccount(
//       accountId,
//       FacebookAdsApi.init(facebookAccessToken!),
//     );

//     const fbCampaigns = await Promise.all(
//       campaign_ids.map(async (id) => {
//         try {
//           return await account.get([AdAccount.Fields.name], {
//             fields: ["name"],
//             params: { campaign_ids: [id] },
//           });
//         } catch (error) {
//           console.error(
//             `Error fetching campaign data for campaign_id ${id}:`,
//             error,
//           );
//           return null;
//         }
//       }),
//     );

//     return fbCampaigns.filter((result) => result !== null);
//   } catch (error) {
//     console.error("Error fetching campaign data:", error);
//     return [];
//   }
// };
