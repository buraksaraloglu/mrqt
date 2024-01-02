import Link from "next/link";
import { AdAccount } from "@/services/facebook/interfaces";
import { getUserFacebookAdAccounts } from "@/services/facebook/service/ad-account";
import { FacebookAdAccount } from "@prisma/client";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

async function getAdAccountsOfUser() {}

export default async function AdAccountPage() {
  const user = await requireUser();
  const adAccounts = await getUserFacebookAdAccounts(user.id, false);

  return (
    <DashboardShell>
      <DashboardHeader heading="Facebook Ad Accounts" />
      {adAccounts && adAccounts?.length > 0 ? (
        <div className="grid gap-10">
          <div>
            <div className="my-4 space-y-2">
              {adAccounts?.length > 0 ? (
                <div className="grid gap-2">
                  {adAccounts.map((adAccount) => (
                    <>
                      <AdAccountSelect adAccount={adAccount} />
                    </>
                  ))}
                </div>
              ) : (
                <div>No Ad Accounts</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>No Ad Accounts</div>
      )}
    </DashboardShell>
  );
}

function AdAccountStatus({ isActive }: { isActive: boolean }) {
  return (
    <Badge
      variant={isActive ? "secondary" : "outline"}
      className={cn(!isActive && "opacity-80")}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}

function AdAccountSelect({ adAccount }: { adAccount: FacebookAdAccount }) {
  return (
    <Card>
      <CardHeader className="gap-2 space-y-0">
        <Link
          key={adAccount.id}
          href={`facebook/${adAccount.id}`}
          className="flex items-center gap-4 font-semibold opacity-80 hover:opacity-100"
        >
          <Typography variant="h4">{adAccount.name}</Typography>

          <>
            <AdAccountStatus isActive={adAccount.isActive} />
          </>
        </Link>
      </CardHeader>
      <CardContent className="h-10" />
      <CardFooter>
        <Button>
          <Link
            key={adAccount.id}
            href={`facebook/${adAccount.id}`}
            className="flex items-center gap-4 font-semibold opacity-80 hover:opacity-100"
          >
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
