import { clerkClient } from "@clerk/nextjs";

export async function getFacebookToken(userId: string) {
  const token = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_facebook",
  );

  if (!token.length) return null;
  return token;
}
