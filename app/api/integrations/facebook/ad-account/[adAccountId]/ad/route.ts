import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import { createAdHandler } from "@/services/facebook/controller/ad";
import { validateAdInput } from "@/services/facebook/schema/ad";

import { requireUser } from "@/lib/auth";

export async function POST(
  req: Request,
  ctx: { params: { adAccountId: string } },
) {
  const body = await req.json();
  const ad = validateAdInput(body);
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);
  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const createdFacebookAd = await createAdHandler({
    adAccountId: ctx.params.adAccountId,
    ad,
    facebookAccessToken,
    userId: user.id,
    adSetId: ad.adset_id,
  });

  return NextResponse.json({ data: createdFacebookAd });
}
