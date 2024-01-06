import { z } from "zod";

import { requireUser } from "@/lib/auth";

// import shopify from "@/lib/shopify";

// const authenticateShopifySchema = z.object({
//   shop: z.string().refine((shop) => {
//     console.log("shop", shop);
//     return shopify.utils.sanitizeShop(shop, true);
//   }),
// });

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: Request) {
  const user = await requireUser();

  const { searchParams } = new URL(req.url);
  // const { shop } = authenticateShopifySchema.parse({
  //   shop: searchParams.get("shop"),
  // });

  // return await shopify.auth
  //   .begin({
  //     isOnline: false,
  //     shop,
  //     callbackPath: "/api/integrations/shopify/auth/callback",
  //     rawRequest: new Request(req),
  //   })
  //   .then((authUrl) => {
  //     return {
  //       status: 302,
  //       headers: {
  //         location: authUrl,
  //       },
  //     };
  //   });
  return null;
}
