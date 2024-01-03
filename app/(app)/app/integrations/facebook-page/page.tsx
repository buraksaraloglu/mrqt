import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PageContent, PageHeader } from "@/components/page";

import { IntegrationNav, NavLink } from "../navigation";

export default function FacebookPageIntegration() {
  return (
    <>
      <PageHeader
        title="Pages"
        description="Your monthly bill is calculated by the combined ad spend of active ad accounts managed by okbrk."
        actions={
          <>
            <Button variant="outline">Connect profile</Button>
          </>
        }
      />

      <PageContent>
        <IntegrationNav />
      </PageContent>
    </>
  );
}
