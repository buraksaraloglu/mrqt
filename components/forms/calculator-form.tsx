"use client";

import { useState, useTransition } from "react";
import { calculateBudget, type FormData } from "@/actions/calculator";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { marketingBudgetSchema } from "@/lib/validations/marketing-budget";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, InputWithLabel } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Icons } from "@/components/shared/icons";

import { Switch } from "../ui/switch";

interface CalculatorFormProps {
  campaign?: z.infer<typeof marketingBudgetSchema>;
}

type MarketingBudget = {
  impressions: number;
  clicks: number;
  adCost: number;
  revenue: number;
  profit: number;
};

type FormInput = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

const FormInput = ({ label, name, register, errors, ...rest }: FormInput) => (
  <div className="grid gap-1">
    <Input
      label={label}
      id={name}
      className="w-full"
      {...register(name, {
        valueAsNumber: true,
      })}
      error={errors?.[name]?.message}
      {...rest}
    />
  </div>
);

type CalculatedBudget = Awaited<ReturnType<typeof calculateBudget>>["data"];

export function CalculatorForm({ campaign }: CalculatorFormProps) {
  const [isPending, startTransition] = useTransition();
  const [budgetMode, setBudgetMode] = useState<"monthly" | "daily">("monthly");

  const [calculation, setCalculation] = useState<CalculatedBudget | null>(null);
  // const updateUserNameWithId = calculateBudget.bind(null, user.id);
  const mockCampaign: z.infer<typeof marketingBudgetSchema> = {
    targetUnits: 1,
    averageSalesPrice: 79,
    cpm: 7.79,
    cpmMrqt: 7.79,
    ctr: 0.01,
    ctrMrqt: 0.02,
    cr: 0.025,
    crMrqt: 0.0,
    cpc: 0.099,
    cpcMrqt: 0.099,
    budget: 10000,
    cost: 29,
  };

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(marketingBudgetSchema),
    defaultValues: {
      ...(campaign || mockCampaign),
    },
    reValidateMode: "onBlur",
  });

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      // const { status } = await updateUserNameWithId(data);

      const { status, data } = await calculateBudget(input);

      console.log({ ...data });
      setCalculation(data);

      if (status !== "success") {
        toast({
          title: "Something went wrong.",
          description: "Your name was not updated. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title:
            (data?.regular.profit || 0) > 0
              ? "Your ad strategy is profitable"
              : "Your ad strategy is not profitable",
          // description: `Your budget is ${data?.clicks} clicks, ${data?.impressions} impressions`,
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Marketing Budget</CardTitle>
          <CardDescription>
            Calculate how much you need to spend to reach your goal
          </CardDescription>
        </CardHeader>

        <div className="grid h-full gap-4 lg:grid-cols-[1fr,1fr]">
          <CardContent className="max-w-xl space-y-4 pe-1.5">
            <FormInput
              label="Target Units"
              name="targetUnits"
              type="number"
              step="any"
              min={0}
              register={register}
              errors={errors}
            />

            <FormInput
              label="Average Price"
              name="averageSalesPrice"
              type="number"
              step="any"
              min={0}
              register={register}
              errors={errors}
            />

            <FormInput
              label="Item Cost"
              name="cost"
              type="number"
              step="any"
              min={0}
              register={register}
              errors={errors}
            />

            <Row>
              <FormInput
                label="Conversion Rate"
                name="cr"
                type="number"
                min={0}
                max={100}
                step="any"
                register={register}
                errors={errors}
              />
              <FormInput
                label="With Mrqt"
                name="crMrqt"
                type="number"
                step="any"
                min={0}
                register={register}
                errors={errors}
              />
            </Row>

            <Row>
              <FormInput
                label="Click Through Rate"
                name="ctr"
                type="number"
                min={0}
                step="any"
                register={register}
                errors={errors}
              />
              <FormInput
                label="With Mrqt"
                name="ctrMrqt"
                type="number"
                step="any"
                min={0}
                register={register}
                errors={errors}
              />
            </Row>

            <Row>
              <FormInput
                label="Cost Per 1000 Impressions (CPM)"
                name="cpm"
                type="number"
                min={0}
                step="any"
                register={register}
                errors={errors}
              />
              <FormInput
                label="With Mrqt"
                name="cpmMrqt"
                type="number"
                step="any"
                min={0}
                register={register}
                errors={errors}
              />
            </Row>

            {/* <FormInput
              label="Cost Per Click (CPC)"
              name="cpc"
              type="number"
              min={0}
              step="any"
              register={register}
              errors={errors}
            /> */}
          </CardContent>

          <CardContent className="ps-1.5">
            {calculation ? (
              <div>
                <div className="grid h-full grid-cols-[1fr,1fr] gap-4 md:gap-8">
                  <BudgetMetrics
                    title="Standart"
                    metric={calculation.regular}
                  />
                  <BudgetMetrics
                    isPromoted
                    metric={calculation.withMrqt}
                    previousMetric={calculation.regular}
                  />
                </div>
              </div>
            ) : (
              <div className="hidden lg:block">
                <EmptyPlaceholder className="border-none">
                  <EmptyPlaceholder.Icon name="post" />
                  <EmptyPlaceholder.Title>
                    Calculate your budget
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                    You don&apos;t have any marketing calculations yet.
                    <br />
                    Start calculating your budget.
                  </EmptyPlaceholder.Description>
                  {/* <Button variant="outline">Fake button</Button> */}
                </EmptyPlaceholder>
              </div>
            )}
          </CardContent>
        </div>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{isPending ? "Calculating" : "Calculate"}</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}

type BudgetMetricsProps = {
  metric: MarketingBudget;
  previousMetric?: MarketingBudget;
} & (
  | {
      title: string;
      isPromoted?: false;
    }
  | {
      title?: never;
      isPromoted: true;
    }
);

const BudgetMetrics = ({
  title,
  isPromoted,
  metric,
  previousMetric,
}: BudgetMetricsProps) => {
  const CTAIcon = isPromoted ? Icons.check : Icons.add;

  return (
    <div className="flex h-full flex-1 flex-col gap-6">
      <div className="space-y-4">
        <CardTitle>{isPromoted ? `With ${siteConfig.name}` : title}</CardTitle>
        <hr />
        <div className="space-y-8">
          <div className="space-y-4">
            <PrimaryMetric
              label="Ad Cost"
              value={metric.adCost}
              prevValue={previousMetric?.adCost}
              expected="decrease"
            />
            <PrimaryMetric
              label="Revenue"
              value={metric.revenue}
              prevValue={previousMetric?.revenue}
              expected="decrease"
            />
            <PrimaryMetric
              label="Profit"
              value={metric.profit}
              prevValue={previousMetric?.profit}
              expected="increase"
            />
          </div>
          <div className="space-y-4">
            <Metric
              label="Clicks Needed"
              value={metric.clicks}
              prevValue={previousMetric?.clicks}
            />
            <Metric
              label="Impressions Needed"
              value={metric.impressions}
              prevValue={previousMetric?.impressions}
            />
          </div>
        </div>
      </div>
      <div>
        {isPromoted && (
          <Button>
            <CTAIcon className="mr-2 h-4 w-4" />
            <span>{isPromoted ? `Launch Campaign` : `Create an Ad`}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

const PrimaryMetric = ({
  label,
  value,
  prevValue,
  expected,
}: {
  label: string;
  value: number;
  prevValue?: number;
  expected?: "increase" | "decrease";
}) => {
  const isSame = value === (prevValue || 0);
  const isPositive = value > (prevValue || 0);
  const isDoingGood = isPositive === (expected === "increase");
  return (
    <div>
      <Label className="flex items-center gap-3 text-lg font-semibold leading-6">
        <span>{label}</span>
        {!isSame && typeof prevValue === "number" ? (
          <span className="space-x-1 text-xs font-normal">
            <span>
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                maximumFractionDigits: 2,
              }).format(
                expected === "increase"
                  ? (value - prevValue) / prevValue
                  : (prevValue - value) / prevValue,
              )}
            </span>

            <span className="text-xs text-muted-foreground">
              <span>{isDoingGood ? "better" : "worse"}</span>
              <span> than standart</span>
            </span>
          </span>
        ) : (
          <span className="text-xs text-muted-foreground"></span>
        )}
      </Label>

      <div>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("en-US", {
            currency: "USD",
            style: "currency",
          }).format(value)}
        </div>
      </div>
    </div>
  );
};

const Metric = ({
  label,
  value,
  prevValue,
}: {
  label: string;
  value: number;
  prevValue?: number;
}) => (
  <>
    <div>
      <Label>{label}</Label>
      <p className="text-xl">
        <span className="">
          {new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(value)}
        </span>

        {typeof prevValue === "number" && (
          <span>
            <span className="ml-2 text-xs text-foreground">
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                maximumFractionDigits: 2,
              }).format((value - prevValue) / prevValue)}
            </span>{" "}
            <span className="text-xs text-muted-foreground">
              <span>{value > prevValue ? "more" : "less"}</span>
              <span> than standart</span>
            </span>
          </span>
        )}
      </p>
    </div>
  </>
);

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-end justify-between gap-4">
      {children}
    </div>
  );
}
