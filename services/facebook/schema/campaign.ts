import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string(),
  status: z.string(),
  buying_type: z.string(),
  objective: z.string(),
  special_ad_categories: z.string(),
  daily_budget: z.number(),
  target: z.array(z.record(z.string(), z.any())),
  campaign_type: z.string(),
});

const createCampaignSchema = z.object({
  campaign: campaignSchema,
});

export const validateCampaignInput = (formData: FormData) => {
  const { campaign } = createCampaignSchema.parse(formData);
  return campaign;
};
