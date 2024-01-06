// import shopify from "@/lib/shopify";

// export async function GET(req: Request, res: Response) {
//   const auth = shopify.auth.begin({
//     isOnline: false,
//     shop: "",
//     callbackPath: "/api/auth/callback",
//   })
//   try {
//     await Shopify.Webhooks.Registry.process(req, res);
//     console.log(`Webhook processed, returned status code 200`);
//   } catch (error) {
//     console.log(`Failed to process webhook: ${error}`);
//   }
// }

// // We need to disable the body parser here because `Shopify.Webhooks.Registry.process()`
// // expects a raw body which is used for checking the validity (HMAC) of the Webhook
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
