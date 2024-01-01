import {
  fetchUserFacebookAdAccounts,
  getUserFacebookAdAccounts,
} from "@/services/facebook/service/ad-account";

import { requireUser } from "@/lib/auth";
import { Typography } from "@/components/ui/typography";
import { DashboardContent } from "@/components/dashboard/content";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { ImportFBAdAccountForm } from "@/components/forms/import-fb-ad-account-form";
import { Icons } from "@/components/shared/icons";

export default async function AdAccountPage() {
  const user = await requireUser();
  const [fbAdAccounts, userFbAdAccounts] = await Promise.all([
    fetchUserFacebookAdAccounts(user.id),
    getUserFacebookAdAccounts(user.id),
  ]);

  return (
    <DashboardShell>
      <DashboardHeader heading="Ad Accounts" text="Manage your ad accounts." />
      {/* <Link href="/app/settings/adaccount">Ad Account</Link> */}
      <DashboardContent>
        <div className="grid gap-10">
          <div>
            <Typography variant="h3" className="flex items-center gap-2">
              <Icons.facebook />
              Facebook
            </Typography>
            <div className="my-4 space-y-2">
              {fbAdAccounts?.length > 0 ? (
                <ImportFBAdAccountForm
                  fbAdAccounts={fbAdAccounts}
                  userAdAccounts={userFbAdAccounts || []}
                />
              ) : (
                <div>No Ad Accounts</div>
              )}
            </div>
          </div>
        </div>
      </DashboardContent>
    </DashboardShell>
  );
}
