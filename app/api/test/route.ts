import { NextResponse } from "next/server";
import { callFacebookApi, getFacebookToken } from "@/services/facebook";
import { fetchFacebookAdAccounts } from "@/services/facebook/service/ad-account";
import { auth, currentUser } from "@clerk/nextjs";

import { requireUser } from "@/lib/auth";

export async function GET() {
  // Get the userId from auth() -- if null, the user is not logged in
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const accessToken = facebookAccessToken[0];
  const adAccounts = await fetchFacebookAdAccounts(accessToken);

  // Perform your Route Handler's logic with the returned user object

  return NextResponse.json({ adAccounts }, { status: 200 });
}
