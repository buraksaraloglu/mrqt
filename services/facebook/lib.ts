import { clerkClient } from "@clerk/nextjs";

export async function getFacebookToken(userId: string) {
  const token = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_facebook",
  );

  if (!token.length) return;
  const facebookToken = token.find((t) => t.provider === "oauth_facebook");
  return facebookToken?.token;
}
