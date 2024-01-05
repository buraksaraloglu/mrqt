import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import { getFacebookAdHandler } from "@/services/facebook/controller/ad";

import { requireUser } from "@/lib/auth";

export async function GET(req: Request, ctx: { params: { adId: string } }) {
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const facebookAdId = ctx.params.adId;

  const facebookAdData = await getFacebookAdHandler({
    adId: facebookAdId,
    facebookAccessToken,
  });

  return NextResponse.json({ data: facebookAdData });
}
