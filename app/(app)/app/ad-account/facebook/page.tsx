import Link from "next/link";
import { getUserFacebookAdAccounts } from "@/services/facebook/service/ad-account";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

async function getAdAccountsOfUser() {}

export default async function AdAccountPage() {
  const user = await requireUser();
  const adAccounts = await getUserFacebookAdAccounts(user.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Facebook Ad Accounts" />
      {adAccounts && adAccounts?.length > 0 ? (
        <div className="grid gap-10">
          <div>
            <div className="my-4 space-y-2">
              {adAccounts?.length > 0 ? (
                <div>
                  {adAccounts.map((adAccount) => (
                    <Link key={adAccount.id} href={`facebook/${adAccount.id}`}>
                      {adAccount.name}
                    </Link>
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
