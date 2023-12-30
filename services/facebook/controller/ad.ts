import { Ad, AdAccount, FacebookAdsApi } from "facebook-nodejs-business-sdk";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";

import { AdParams } from "../interfaces";
import { createAd, getAd } from "../service/ad";

const FacebookAdsApiInstance = FacebookAdsApi.init(env.FACEBOOK_ACCESS_TOKEN);

interface CreateAdControllerParams {
  ads: AdParams[];
  facebookAdSetId: string;
  existingAdSetId: number;
}

export const createAdController = async ({
  ads,
  facebookAdSetId,
  existingAdSetId,
}: CreateAdControllerParams) => {
  try {
    if (!ads || !Array.isArray(ads)) {
      throw new Error("Invalid or missing ads array");
    }

    const newAds = await Promise.all(
      ads.map((ad: AdParams) =>
        createAd({ ...ad, facebookAdSetId, existingAdSetId }),
      ),
    );

    return newAds;
  } catch (error) {
    console.error("Error creating Ads:", error);

    if (error instanceof Error) {
      console.error("Error Message:", error.message);
    }

    return null;
  }
};

// export const getAdController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   isNestedCall: boolean = false,
// ) => {
//   try {
//     const { ad_ids } = req.body;

//     const dbAd = ad_ids
//       ? await prisma.ad.findMany({
//           where: { ad_id: { in: ad_ids } },
//         })
//       : [];

//     const fbAd = ad_ids ? await getAd(ad_ids) : [];

//     if (isNestedCall) {
//       return { dbAd, fbAd };
//     } else {
//       res.json({ dbAd, fbAd });
//     }
//   } catch (error) {
//     console.error("Error fetching ad data:", error);
//     next(error);
//   }
// };

// export const updateAdController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   isNestedCall: boolean = false,
// ) => {
//   try {
//     const { ads } = req.body;

//     if (!ads || !Array.isArray(ads)) {
//       throw new Error("Invalid or missing fields for update");
//     }

//     const updatedAds = [];

//     for (const ad of ads) {
//       const account = new AdAccount(accountId, FacebookAdsApiInstance);
//       await account.get([AdAccount.Fields.name], {
//         fields: ["name"],
//       });

//       console.log("Updating Ad...");
//       const adObj = new Ad(ad.ad_id);
//       await adObj.update([Ad.Fields.name], {
//         [Ad.Fields.name]: ad.name,
//       });

//       await prisma.ad.update({
//         where: { ad_id: ad.ad_id },
//         data: ad,
//       });

//       console.log(`Ad with ID ${ad.ad_id} updated successfully.`);
//       updatedAds.push(ad);
//     }

//     if (isNestedCall) {
//       return { dbAds: updatedAds, fbAds: updatedAds };
//     } else {
//       res.json({
//         message: "Ads updated successfully",
//         data: updatedAds,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating ads:", error);
//     next(error);
//   }
// };
