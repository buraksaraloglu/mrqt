export async function GET(req: Request) {
  console.log({ url: req.url });
  return new Response("Hello world");
}
