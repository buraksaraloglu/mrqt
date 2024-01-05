import { z } from "zod";

export const adSetSchema = z.object({
  name: z.string(),
  status: z.string(),
  targeting: z.record(z.string(), z.any()),
  billing_event: z.string(),
  bid_amount: z.number(),
  campaign_id: z.string(),
});

const createAdSetSchema = z.object({
  adSet: adSetSchema,
});

export const validateAdSetInput = (formData: FormData) => {
  const { adSet } = createAdSetSchema.parse(formData);
  return adSet;
};
