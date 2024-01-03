"use client";

import { useCallback, useState, useTransition } from "react";
import { upsertAdAccount } from "@/actions/import-fb-adaccount";
import { AdAccount } from "@/services/facebook/types";
import { User } from "@clerk/backend";
import { FacebookAdAccount } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-clipboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

import { Typography } from "../ui/typography";

interface UserNameFormProps {
  fbAdAccounts?: AdAccount[];
  userAdAccounts?: FacebookAdAccount[];
}

export function ImportFBAdAccountForm({
  fbAdAccounts = [],
  userAdAccounts = [],
}: UserNameFormProps) {
  return (
    <div className="space-y-2">
      {
        <div className="my-4 space-y-2">
          {fbAdAccounts && fbAdAccounts.length > 0 ? (
            fbAdAccounts.map((adAccount) => (
              <SelectAdAccount
                key={adAccount.id}
                adAccount={adAccount}
                defaultSelected={userAdAccounts.some(
                  (a) => a.id === adAccount.id,
                )}
              />
            ))
          ) : (
            <div>No Ad Accounts</div>
          )}
        </div>
      }
    </div>
  );
}

function SelectAdAccount({
  adAccount,
  defaultSelected = false,
}: {
  adAccount: AdAccount;
  defaultSelected?: boolean;
}) {
  const [selected, setSelected] = useState(() => Boolean(defaultSelected));
  const [value, copy] = useCopyToClipboard();

  const [isPending, startTransition] = useTransition();
  const onSwitch = useCallback(
    (isActive: boolean) => {
      startTransition(async () => {
        const { status, data } = await upsertAdAccount({
          ...adAccount,
          isActive,
        });
        if (status !== "success") {
          toast({
            title: "Something went wrong.",
            description: "Could not import your ad accounts",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Updated",
            description: `${adAccount.name} has been ${
              isActive ? "activated" : "removed"
            }`,
          });
        }
      });
    },
    [adAccount],
  );

  const handleSwitch = useCallback(() => {
    setSelected((prev) => !prev);

    // TODO: would this work if api fails?
    onSwitch(!selected);
  }, [onSwitch, selected]);

  return (
    <form>
      <Card
        className={cn(
          "grid cursor-pointer gap-2 md:grid-cols-[1fr,auto]",
          selected ? "opacity-100" : "opacity-80",
        )}
      >
        <CardHeader>
          <h2 className="text-lg font-bold">{adAccount.name}</h2>
          <div>
            <Badge
              className="cursor-pointer"
              onClick={() => {
                toast({
                  title: "Copied to clipboard",
                });
                copy(adAccount.id);
              }}
            >
              ID: {adAccount.id}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center pt-6">
          <div className="flex items-center justify-center gap-2">
            <Switch
              checked={selected}
              onClick={handleSwitch}
              disabled={isPending}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
