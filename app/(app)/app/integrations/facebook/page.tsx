import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdAccount } from "@/services/facebook/interfaces";
import {
  fetchUserFacebookAdAccounts,
  getUserFacebookAdAccounts,
} from "@/services/facebook/service/ad-account";
import { FacebookAdAccount } from "@prisma/client";

import { siteConfig } from "@/config/site";
import { requireUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PageContent, PageHeader } from "@/components/page";
import { Icons } from "@/components/shared/icons";

import { IntegrationNav, NavLink } from "../navigation";
import { FacebookAdAccountsTable } from "./table";

export default async function FacebookIntegrationPage() {
  const user = await requireUser();
  const [fbAdAccounts, userFbAdAccounts] = await Promise.all([
    fetchUserFacebookAdAccounts(user.id),
    getUserFacebookAdAccounts(user.id, false),
  ]);

  return (
    <>
      <PageHeader
        title={
          <>
            {/* <Icons.facebook /> */}
            Facebook Ad Accounts
          </>
        }
        description={`Your monthly bill is calculated by the combined ad spend of active ad accounts managed by ${siteConfig.name}.`}
        actions={
          <>
            <Button variant="outline">Connect profile</Button>
          </>
        }
      />
      <PageContent>
        <IntegrationNav />
        {fbAdAccounts && (
          <FacebookAdAccountsTable
            fbAdAccounts={fbAdAccounts}
            userAdAccounts={userFbAdAccounts}
          />
        )}
      </PageContent>
    </>
  );
}
