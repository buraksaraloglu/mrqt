import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import {
  deleteAdHandler,
  getFacebookAdHandler,
  updateAdHandler,
} from "@/services/facebook/controller/ad";

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

export async function PUT(req: Request, ctx: { params: { adId: string } }) {
  const body = await req.json();
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const facebookAdId = ctx.params.adId;

  const updatedAdData = await updateAdHandler({
    adId: facebookAdId,
    updatedFields: body,
    facebookAccessToken,
  });

  return NextResponse.json({ data: updatedAdData });
}

export async function DELETE(req: Request, ctx: { params: { adId: string } }) {
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const facebookAdId = ctx.params.adId;

  const deletedAdData = await deleteAdHandler({
    adId: facebookAdId,
    facebookAccessToken,
  });

  return NextResponse.json({ data: deletedAdData });
}
