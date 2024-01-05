import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import {
  deleteAdSetHandler,
  getFacebookAdSetHandler,
  updateAdSetHandler,
} from "@/services/facebook/controller/ad-set";

import { requireUser } from "@/lib/auth";

export async function GET(req: Request, ctx: { params: { adSetId: string } }) {
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const facebookAdSetId = ctx.params.adSetId;

  const facebookAdSetData = await getFacebookAdSetHandler({
    adSetId: facebookAdSetId,
    facebookAccessToken,
  });

  return NextResponse.json({ data: facebookAdSetData });
}

export async function PUT(req: Request, ctx: { params: { adSetId: string } }) {
  const body = await req.json();
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const facebookAdSetId = ctx.params.adSetId;

  const updatedAdSetData = await updateAdSetHandler({
    adSetId: facebookAdSetId,
    updatedFields: body,
    facebookAccessToken,
  });

  return NextResponse.json({ data: updatedAdSetData });
}

export async function DELETE(
  req: Request,
  ctx: { params: { adSetId: string } },
) {
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);

  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const facebookAdSetId = ctx.params.adSetId;

  const deletedAdSetData = await deleteAdSetHandler({
    adSetId: facebookAdSetId,
    facebookAccessToken,
  });

  return NextResponse.json({ data: deletedAdSetData });
}
