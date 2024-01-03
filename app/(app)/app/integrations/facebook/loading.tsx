import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PageContent, PageHeader } from "@/components/page";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { Icons } from "@/components/shared/icons";

import { IntegrationNav } from "../navigation";
import { FacebookAdAccountsTable } from "./table";

export default function DashboardLoading() {
  return (
    <>
      <PageHeader
        title={
          <>
            {/* <Icons.facebook /> */}
            Facebook Ad Accounts
          </>
        }
        description="Your monthly bill is calculated by the combined ad spend of active ad accounts managed by okbrk."
        actions={
          <>
            <Button variant="outline">Connect profile</Button>
          </>
        }
      />

      <PageContent>
        <IntegrationNav />

        <FacebookAdAccountsTable isLoading />
      </PageContent>
    </>
  );
}
