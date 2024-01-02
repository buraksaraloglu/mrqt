import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { PageHeader } from "@/components/page";
import { CardSkeleton } from "@/components/shared/card-skeleton";

export default function DashboardLoading() {
  return (
    <>
      <PageHeader
        title="Posts"
        subtitle="Create and manage posts."
        actions={<Button>Fake button</Button>}
      />

      <div className="divide-border-200 divide-y rounded-md border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}
