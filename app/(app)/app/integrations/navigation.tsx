"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

export function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <Typography
        variant="h3"
        className={cn(!isActive && "text-muted-foreground")}
      >
        {children}
      </Typography>
    </Link>
  );
}

export function IntegrationNav() {
  return (
    <div className="flex items-center gap-4">
      <NavLink href="/app/integrations/facebook">Ad accounts</NavLink>

      <NavLink href="/app/integrations/facebook-page">Pages</NavLink>
    </div>
  );
}
