import { requireUser } from "@/lib/auth";
import { CalculatorForm } from "@/components/forms/calculator-form";

export const metadata = {
  title: "Calculator",
  description: "Calculate your conversion needs.",
};

export default async function CalculatorPage() {
  const user = await requireUser();

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
