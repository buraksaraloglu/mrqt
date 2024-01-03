import Link from "next/link";

import { requireUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PageContent, PageHeader } from "@/components/page";
import { Icons } from "@/components/shared/icons";

import { ConnectShopifyForm } from "./shopify/connect";

type PlatformProps = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
};

function PlatformCard({ name, icon, path }: PlatformProps) {
  const disabled = !path;
  return (
    <Link href={path || "#"} aria-disabled={disabled}>
      <Card className="grid h-full w-60 justify-between gap-2">
        {icon && (
          <CardHeader className="h-full">
            <div className="h-full">
              <div className="flex">
                <div className="flex items-center justify-center rounded-full bg-gray-100 p-4 dark:bg-slate-900">
                  {icon}
                </div>
              </div>
            </div>
          </CardHeader>
        )}
        <CardFooter className="items-end">
          <div className="grid gap-1">
            <Typography weight="bold">{name}</Typography>
            <Button variant="outline" disabled={disabled} className="gap-1">
              {disabled ? "Coming soon" : "Connect"}
              {disabled ? (
                <Icons.clock className="h-4 w-4 opacity-50" />
              ) : (
                <Icons.arrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function ConnectAdPlatforms() {
  const className = "h-6 w-6";
  const platforms: PlatformProps[] = [
    {
      name: "Facebook",
      icon: <Icons.facebook className={className} />,
      path: "integrations/facebook",
    },
    {
      name: "Google Ads",
      icon: <Icons.google className={className} />,
    },
    {
      name: "TikTok Ads",
    },
  ];

  return (
    <div className="space-y-4">
      <Typography variant="h4">Ad Platforms</Typography>

      <div className="grid auto-cols-min grid-flow-col-dense gap-4">
        {platforms.map((platform) => (
          <PlatformCard key={platform.name} {...platform} />
        ))}
      </div>
    </div>
  );
}

export default async function Integrations() {
  const user = await requireUser();
  return (
    <>
      <PageHeader title="Integrations" />

      <PageContent className="space-y-4 md:space-y-6">
        <ConnectAdPlatforms />

        <div className="space-y-4">
          <Typography variant="h4">Connect Store</Typography>

          <div>
            <div className="max-w-md">
              <ConnectShopifyForm />
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}
