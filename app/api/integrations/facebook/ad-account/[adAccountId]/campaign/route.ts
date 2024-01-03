import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import {
  createCampaignHandler,
  validateCampaignInput,
} from "@/services/facebook/controller/campaign";

import { requireUser } from "@/lib/auth";

export async function POST(
  req: Request,
  ctx: { params: { adAccountId: string } },
) {
  const body = await req.json();
  const campaign = validateCampaignInput(body);
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);
  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const createdFacebookCampaign = await createCampaignHandler({
    campaign,
    facebookAccessToken,
    adAccountId: ctx.params.adAccountId,
    userId: user.id,
  });

  return NextResponse.json({ data: createdFacebookCampaign });
}
