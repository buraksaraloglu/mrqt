import { AdAccount, FacebookAdsApi, User } from "facebook-nodejs-business-sdk";

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
): Promise<any> {
  FacebookAdsApi.init(accessToken);
  const userId = await whoAmI(accessToken);
  if (!userId) throw new Error("Could not fetch Facebook user ID");
  try {
    const u = new User(userId);
    const adAccounts = await u
      .getAdAccounts([
        AdAccount.Fields.id,
        AdAccount.Fields.account_id,
        AdAccount.Fields.name,
      ])
      .then((accounts) => {
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
