"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { marketingBudgetSchema } from "@/lib/validations/marketing-budget";

export type FormData = z.infer<typeof marketingBudgetSchema>;

const randomIncrease = (value: number, range: [number, number]) => {
  const [min, max] = range;
  return (Math.random() * (max - min) + 1) * value;
};

export async function calculateBudget(data: FormData) {
  try {
    const budget = marketingBudgetSchema.parse(data);

    const calculator = new AdvertisingCalculator(budget);
    const withMrqt = new AdvertisingCalculator({
      ...budget,
      cpm: budget.cpmMrqt || randomIncrease(budget.cpm, [1.1, 1.3]),
      cr: budget.crMrqt || randomIncrease(budget.cr, [1.1, 1.3]),
      ctr: budget.ctrMrqt || randomIncrease(budget.ctr, [1.1, 1.3]),
    });
    const clicks = calculator.calculateClicksNeeded(); // Clicks per conversion
    const impressions = calculator.calculateImpressionsNeeded(); // Impressions per conversion

    const adCost = calculator.calculateAdCost(); // Total cost of campaign
    const profit = calculator.calculateProfit(); // Total cost of campaign
    const revenue = calculator.calculateRevenue(); // Total cost of campaign

    // // Update the user name.
    // await prisma.user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     name: name,
    //   },
    // });

    // revalidatePath("/dashboard/settings");

    const regular = {
      clicks,
      impressions,
      profit,
      adCost,
      revenue,
    };

    const withMrqtData = {
      clicks: withMrqt.calculateClicksNeeded(),
      impressions: withMrqt.calculateImpressionsNeeded(),
      profit: withMrqt.calculateProfit(),
      adCost: withMrqt.calculateAdCost(),
      revenue: withMrqt.calculateRevenue(),
    };

    return {
      status: "success",
      data: {
        regular,
        withMrqt: withMrqtData,
      },
    };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
}

class AdvertisingCalculator {
  // Constants
  private readonly DAYS_IN_MONTH = 30;

  // Variables
  private salesGoal: number;
  private initialCPM: number;
  private CTR: number; // Click-Through Rate
  private CR: number; // Conversion Rate
  private CPMDecreaseRate: number; // Decrease rate of CPM per interval
  private CPMDecreaseInterval: number; // Interval in days for CPM decrease
  private campaignDuration: number; // Total campaign duration in days
  private dailyBudget: number;
  private cpc: number;
  private cost: number;
  private averageSalesPrice: number;

  constructor({
    targetUnits,
    cpm,
    ctr,
    cr,
    cpmDecreaseRate,
    cpmDecreaseInterval,
    cpc,
    budget,
    cost,
    averageSalesPrice,
    duration = 30,
  }: FormData) {
    this.salesGoal = targetUnits;
    this.initialCPM = cpm;
    this.CTR = ctr;
    this.CR = cr;
    this.CPMDecreaseRate = cpmDecreaseRate || 0;
    this.CPMDecreaseInterval = cpmDecreaseInterval || 0;
    this.campaignDuration = duration;
    this.dailyBudget = budget / this.campaignDuration;
    this.cost = cost || 0;
    this.averageSalesPrice = averageSalesPrice;
    this.cpc = cpm / (ctr * 1000);
  }

  // Calculate clicks needed to achieve sales goal
  calculateClicksNeeded() {
    return (1 / this.CR) * this.salesGoal;
  }

  // Calculate impressions needed to achieve sales goal
  calculateImpressionsNeeded() {
    return this.calculateClicksNeeded() / this.CTR;
  }

  calculateRevenue() {
    return this.salesGoal * this.averageSalesPrice;
  }

  // Calculate the total cost of the campaign
  calculateAdCost() {
    const impressions = this.calculateImpressionsNeeded();
    return (impressions * this.initialCPM) / 1000;
  }

  // Calculate the total cost of the campaign
  calculateTotalCostWithDecrease() {
    let cost = 0;
    let cpm = this.initialCPM;
    let days = 0;

    while (days < this.campaignDuration) {
      cost += this.calculateImpressionsNeeded() * cpm;
      days += this.CPMDecreaseInterval;
      cpm -= this.CPMDecreaseRate;
    }

    return cost;
  }

  // Calculate profit
  calculateProfit() {
    const totalSales = this.salesGoal * this.averageSalesPrice;
    const totalItemCost = this.salesGoal * this.cost;
    const adCost = this.calculateAdCost();
    return totalSales - (adCost + totalItemCost);
  }
}
