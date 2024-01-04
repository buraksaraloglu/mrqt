import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import { getFacebookCampaignHandler } from "@/services/facebook/controller/campaign";

import { requireUser } from "@/lib/auth";

export async function GET(
  req: Request,
  ctx: { params: { campaignId: string } },
) {
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const facebookCampaignId = ctx.params.campaignId;

  const facebookCampaignData = await getFacebookCampaignHandler({
    campaignId: facebookCampaignId,
    facebookAccessToken,
  });

  return NextResponse.json({ data: facebookCampaignData });
}
