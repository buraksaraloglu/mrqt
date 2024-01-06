import {
  AdAccount,
  Campaign,
  FacebookAdsApi,
  TargetingGeoLocation,
  TargetingGeoLocationCity,
} from "facebook-nodejs-business-sdk";

import { CreateFacebookCampaignParams } from "../types";

export const fbPlayground = async (
  searchQuery: string,
  facebookAccessToken,
) => {
  const geoLocation = new TargetingGeoLocation(
    null,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  console.log({ cityKey: facebookAccessToken });

  return null;
};

export const createFacebookCampaign = async ({
  campaign,
  adAccountId,
  facebookAccessToken,
}: CreateFacebookCampaignParams) => {
  FacebookAdsApi.init(facebookAccessToken!);

  const account = new AdAccount(
    adAccountId,
    FacebookAdsApi.init(facebookAccessToken!),
  );

  const createdCampaign = await account.createCampaign([], campaign);
  const facebookCampaignId = createdCampaign._data.id;

  if (!facebookCampaignId || typeof facebookCampaignId !== "string") {
    throw new Error("No facebook campaignId created");
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
