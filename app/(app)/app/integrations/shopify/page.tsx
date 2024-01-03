import {
  fetchUserFacebookAdAccounts,
  getUserFacebookAdAccounts,
} from "@/services/facebook/service/ad-account";
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
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { PageContent, PageHeader } from "@/components/page";

import { IntegrationNav, NavLink } from "../navigation";
import { ConnectShopifyForm } from "./connect";

export default async function ShopifyIntegrationPage() {
  const user = await requireUser();
  const [fbAdAccounts, userFbAdAccounts] = await Promise.all([
    fetchUserFacebookAdAccounts(user.id),
    getUserFacebookAdAccounts(user.id, false),
  ]);

  return (
    <>
      <PageHeader
        title="Shopify"
        description="Connect your Shopify store to get started."
      />
      <PageContent>
        <div className="space-y-4">
          <ConnectShopifyForm />
        </div>
      </PageContent>
    </>
  );
}
