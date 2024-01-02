import Link from "next/link";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/page";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const user = await requireUser();
  if (!user) return redirect("/login");

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage account and website settings."
      />
      <Link href="/app/settings/adaccount">Ad Account</Link>
      {/* <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.username || "" }} />
      </div> */}
    </>
  );
}
