"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

import { Typography } from "../ui/typography";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <div
                className={cn(
                  "group flex items-center rounded-md py-2 transition-all",
                  path === item.href && "text-white",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <Typography
                  variant="muted"
                  weight="medium"
                  size="sm"
                  className="transition-all group-hover:text-white"
                >
                  {item.title}
                </Typography>
              </div>
            </Link>
          )
        );
      })}
    </nav>
  );
}
