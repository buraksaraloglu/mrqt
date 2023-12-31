import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";

import { marketingConfig } from "@/config/marketing";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  // const user = await currentUser();

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Suspense fallback="..."> */}
      {/* {user ? (
        <NavBar user={user} items={marketingConfig.mainNav} scroll={true} />
      ) : null} */}
      {/* </Suspense> */}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
