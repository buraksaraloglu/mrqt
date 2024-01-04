import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PageContent, PageHeader } from "@/components/page";
import { CardSkeleton } from "@/components/shared/card-skeleton";

import { IntegrationNav } from "../navigation";
import { FacebookAdAccountsTable } from "./table";

export default function FacebookIntegrationLoading() {
  return (
    <>
      <PageHeader
        title="Facebook Ad Accounts"
        description={`Your monthly bill is calculated by the combined ad spend of active ad accounts managed by ${siteConfig.name}.`}
        actions={
          <>
            <Button variant="outline">Connect profile</Button>
          </>
        }
      />
      <PageContent className="space-y-4">
        <IntegrationNav />

        <div className="space-y-4">
          <CardSkeleton />

          <FacebookAdAccountsTable isLoading />
        </div>
      </PageContent>
    </>
  );
}
