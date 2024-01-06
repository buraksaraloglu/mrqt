import { currentUser } from "@clerk/nextjs";

import {
  decryptAuthOkbrkRequest,
  encryptAuthOkbrkRequest,
} from "@/lib/adapters/shopify-app";

// import {} from '@clerk/backend'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const shop = searchParams.get("shop");
  if (!shop) {
    return Response.json({ error: "Missing shop parameter" }, { status: 400 });
  }

  const decrypted = decryptAuthOkbrkRequest(shop);

  console.log({ decrypted }); // outputs the decrypted data

  // const user = await currentUser();

  return Response.json({ shop: shop });
}
