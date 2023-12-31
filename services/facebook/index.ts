import * as bizSdk from "facebook-nodejs-business-sdk";

export type FacebookInput = {
  accessToken: string;
};

type CallFacebookInput = {
  endpoint: string;
  fields?: string[];
} & FacebookInput;

export async function callFacebookApi({
  endpoint,
  fields = ["name", "id", "account_id"],
  accessToken,
}: CallFacebookInput) {
  const host = "https://graph.facebook.com/v18.0";

  const params = new URLSearchParams();
  params.append("access_token", accessToken);
  if (fields?.length) {
    params.append("fields", fields.join(","));
  }

  const requestUrl = `${host}/${endpoint}?${params.toString()}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

interface FacebookAccountInput {
  accessToken: string;
  accountId: string;
}

function getter({ accessToken, accountId }: FacebookAccountInput) {
  const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);

  const AdAccount = bizSdk.AdAccount;
  const Campaign = bizSdk.Campaign;

  const account = new AdAccount(accountId);
  var campaigns;

  account
    .read([AdAccount.Fields.name])
    .then((account) => {
      return account.getCampaigns([Campaign.Fields.name], { limit: 10 }); // fields array and params
    })
    .then((result) => {
      campaigns = result;
      campaigns.forEach((campaign) => console.log(campaign.name));
    })
    .catch(console.error);
}

export * from "./lib";
