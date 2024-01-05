import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import { createAdSetHandler } from "@/services/facebook/controller/ad-set";
import { validateAdSetInput } from "@/services/facebook/schema/ad-set";

import { requireUser } from "@/lib/auth";

export async function POST(
  req: Request,
  ctx: { params: { adAccountId: string } },
) {
  const body = await req.json();
  const adSet = validateAdSetInput(body);
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);
  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const createdFacebookAdSet = await createAdSetHandler({
    adAccountId: ctx.params.adAccountId,
    adSet,
    facebookAccessToken,
    userId: user.id,
    campaignId: adSet.campaign_id,
  });

  return NextResponse.json({ data: createdFacebookAdSet });
}
