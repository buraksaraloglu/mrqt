import { NextResponse } from "next/server";
import { getFacebookToken } from "@/services/facebook";
import { fbPlayground } from "@/services/facebook/service/campaign";

import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic"; // defaults to auto

export async function playground() {
  console.log("playground");
  const user = await requireUser();
  const facebookAccessToken = await getFacebookToken(user.id);
  if (!facebookAccessToken) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  const res = await fbPlayground("istanbul", facebookAccessToken);

  return NextResponse.json({ data: res });
}

export async function GET() {
  return await playground();
}
