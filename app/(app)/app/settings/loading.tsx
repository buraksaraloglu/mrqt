import { PageHeader } from "@/components/page";
import { CardSkeleton } from "@/components/shared/card-skeleton";

export default function DashboardSettingsLoading() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </>
  );
}
