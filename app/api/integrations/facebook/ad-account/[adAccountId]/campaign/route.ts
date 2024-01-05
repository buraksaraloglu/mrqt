import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import {
  createCampaignHandler,
  getAllCampaignsHandler,
} from "@/services/facebook/controller/campaign";
import { validateCampaignInput } from "@/services/facebook/schema/campaign";

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
    adAccountId: ctx.params.adAccountId,
    campaign,
    facebookAccessToken,
    userId: user.id,
  });

  return NextResponse.json({ data: createdFacebookCampaign });
}

export async function GET(
  req: Request,
  ctx: { params: { adAccountId: string } },
) {
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const campaignsData = await getAllCampaignsHandler({
    facebookAccessToken,
    adAccountId: ctx.params.adAccountId,
  });

  return NextResponse.json({ data: campaignsData });
}
