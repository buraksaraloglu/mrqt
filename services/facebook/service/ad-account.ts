import { AdAccount, FacebookAdsApi, User } from "facebook-nodejs-business-sdk";

import { prisma } from "@/lib/db";

import { getFacebookToken } from "../lib";

export async function whoAmI(accessToken: string): Promise<string | undefined> {
  try {
    const me = await fetch(
      `https://graph.facebook.com/me?fields=id&access_token=${accessToken}`,
    );
    const meJson = await me.json();
    return meJson.id || undefined;
  } catch (error) {
    return undefined;
  }
}

export async function fetchFacebookAdAccounts(
  accessToken: string,
  fields: string[] = [
    AdAccount.Fields.id,
    AdAccount.Fields.account_id,
    AdAccount.Fields.name,
  ],
): Promise<any> {
  FacebookAdsApi.init(accessToken);
  const userId = await whoAmI(accessToken);
  if (!userId) throw new Error("Could not fetch Facebook user ID");
  try {
    const u = new User(userId);
    const adAccounts = await u.getAdAccounts(fields).then((accounts) => {
      return accounts.map((account) => {
        return {
          id: account.id,
          name: account.name,
          account_id: account.account_id,
        };
      });
    });

    return adAccounts;
  } catch (error) {
    console.error("Error fetching Facebook ad accounts:", error);
    throw error;
  }
}

export async function fetchUserFacebookAdAccounts(userId: string) {
  const accessToken = await getFacebookToken(userId);
  if (!accessToken) return;
  const facebookAdAccounts = await fetchFacebookAdAccounts(accessToken);

  return facebookAdAccounts;
}

export async function getUserFacebookAdAccounts(
  userId: string,
  onlyActives = true,
) {
  try {
    const adAccounts = await prisma.facebookAdAccount.findMany({
      where: {
        userId,
        isActive: onlyActives || undefined,
      },
    });

    return adAccounts;
  } catch (error) {
    return null;
  }
}
