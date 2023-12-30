import * as z from "zod";

export const marketingBudgetSchema = z.object({
  targetUnits: z.number(),
  cr: z.number(),
  crMrqt: z.number().optional(),
  ctr: z.number(),
  ctrMrqt: z.number().optional(),
  cpm: z.number(),
  cpmMrqt: z.number().optional(),
  cpc: z.number(),
  cpcMrqt: z.number().optional(),
  averageSalesPrice: z.number(),
  budget: z.number(),
  cost: z.number().optional(),
  duration: z.number().optional(),
  cpmDecreaseRate: z.number().optional(),
  cpmDecreaseInterval: z.number().optional(),
});
