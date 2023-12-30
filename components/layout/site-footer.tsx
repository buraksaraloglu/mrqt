import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Icons } from "@/components/shared/icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:flex-row md:py-2">
        <div></div>
        {/* <ModeToggle /> */}
      </div>
    </footer>
  );
}
