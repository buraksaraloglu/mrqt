import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { CalculatorForm } from "@/components/forms/calculator-form";
import { UserNameForm } from "@/components/forms/user-name-form";

export const metadata = {
  title: "Calculator",
  description: "Calculate your conversion needs.",
};

export default async function CalculatorPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="flex w-full flex-col gap-8 py-8 md:py-8">
      <div className="grid gap-1">
        <h1 className="font-heading text-xl md:text-2xl">Calculator</h1>
      </div>
      <div className="grid gap-10">
        <CalculatorForm />
      </div>
    </div>
  );
}
