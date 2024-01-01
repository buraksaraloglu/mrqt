"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@clerk/backend";
import { useClerk } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";
import { CreditCard, LayoutDashboard, LogOut, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/user-avatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User | UserResource;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar userId={user.id} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.emailAddresses[0].emailAddress && (
              <p className="font-medium">
                {user?.emailAddresses[0].emailAddress || user?.firstName || ""}
              </p>
            )}
            {user?.emailAddresses[0].emailAddress && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/app" className="flex items-center space-x-2.5">
            <LayoutDashboard className="h-4 w-4" />
            <p className="text-sm">Dashboard</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/app/billing" className="flex items-center space-x-2.5">
            <CreditCard className="h-4 w-4" />
            <p className="text-sm">Billing</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/app/settings" className="flex items-center space-x-2.5">
            <Settings className="h-4 w-4" />
            <p className="text-sm">Settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut(() => router.push("/"));
          }}
        >
          <div className="flex items-center space-x-2.5">
            <LogOut className="h-4 w-4" />
            <p className="text-sm">Log out </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
