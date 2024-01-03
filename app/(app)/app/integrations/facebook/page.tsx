import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  fetchUserFacebookAdAccounts,
  getUserFacebookAdAccounts,
} from "@/services/facebook/service/ad-account";
import { AdAccount } from "@/services/facebook/types";
import { FacebookAdAccount } from "@prisma/client";
import Balancer from "react-wrap-balancer";

import { siteConfig } from "@/config/site";
import { requireUser } from "@/lib/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PageContent, PageHeader } from "@/components/page";

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
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="custom-conversions">
              <AccordionTrigger iconPosition="left">
                <Typography variant="h3">Custom conversions</Typography>
              </AccordionTrigger>
              <AccordionContent innerClassName="space-y-2">
                <div className="max-w-2xl">
                  <Balancer>
                    <Typography variant="p" className="text-muted-foreground">
                      If you have your custom conversions set up on Facebook,
                      you can use them in {siteConfig.name}. Click Sync to load
                      your custom conversions.
                    </Typography>
                  </Balancer>
                </div>
                <Button variant="secondary">Sync conversions</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {fbAdAccounts && (
            <FacebookAdAccountsTable
              fbAdAccounts={fbAdAccounts}
              userAdAccounts={userFbAdAccounts}
            />
          )}
        </div>
      </PageContent>
    </>
  );
}
