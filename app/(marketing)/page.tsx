import { currentUser } from "@clerk/nextjs";

import { Typography } from "@/components/ui/typography";

export default async function IndexPage() {
  const user = await currentUser();
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <Typography
            variant="h1"
            as="h1"
            className="animate-fade-up text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            OKBRK
          </Typography>

          {user && user.id}
        </div>
      </section>
    </>
  );
}
