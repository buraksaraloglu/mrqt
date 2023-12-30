import { Suspense } from "react";

import { marketingConfig } from "@/config/marketing";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

interface MarketingCalculatorLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingCalculatorLayout({
  children,
}: MarketingCalculatorLayoutProps) {
  return (
    <div className="container flex min-h-screen flex-col">
      {/* <Suspense fallback="...">
        <NavBar user={user} items={marketingConfig.mainNav} scroll={true} />
      </Suspense> */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
