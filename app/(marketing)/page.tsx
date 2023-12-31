import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import Balancer from "react-wrap-balancer";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function IndexPage() {
  const user = await currentUser();
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <h1
            className="animate-fade-up font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            OKBRK
          </h1>

          {user && user.id}

          {/* <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Build your next project using Next.js 14, Prisma, Planetscale, Auth.js, Resend, React Email, Shadcn/ui, Stripe.
            </Balancer>
          </p> */}

          {/* <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <Link
              href="/pricing"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Go Pricing
            </Link>
          </div> */}
        </div>
      </section>

      {/* <section
        className="animate-fade-up py-16 text-zinc-500 opacity-0 dark:text-zinc-400"
        style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
      >
        <div className="container mx-auto">
          <h2 className="text-center text-sm font-semibold uppercase">
            Powered by
          </h2>

          <div className="my-7 flex flex-wrap items-center justify-center gap-10 gap-y-8 lg:gap-14">
            {features.map((feature) => (
              <Link
                target="_blank"
                key={feature.title}
                href={feature.href}
                aria-label={feature.title}
                className="flex flex-col items-center transition duration-300 hover:text-black dark:hover:text-white"
              >
                {feature.icon}
              </Link>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
