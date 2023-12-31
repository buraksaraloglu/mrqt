import { callFacebookApi, FacebookInput } from "..";

export async function getFacebookAdAccounts({ accessToken }: FacebookInput) {
  const fields = ["name", "id", "account_id"];
  const response = await callFacebookApi({
    endpoint: "me/adaccounts",
    accessToken,
    fields,
  });

  return response.data;
}
