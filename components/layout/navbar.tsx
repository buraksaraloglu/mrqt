"use client";

import Link from "next/link";
import { MainNavItem } from "@/types";
import type { User } from "@clerk/backend";
import { useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import useScroll from "@/hooks/use-scroll";
import { Button, buttonVariants } from "@/components/ui/button";

import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const { user, isLoaded } = useUser();

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {isLoaded ? (
            !user ? (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                Login
              </Link>
            ) : (
              <UserAccountNav user={user} />
            )
          ) : null}
        </div>
      </div>
    </header>
  );
}
