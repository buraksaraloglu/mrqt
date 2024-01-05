import { z } from "zod";

export const adSchema = z.object({
  name: z.string(),
  status: z.string(),
  creative: z.record(z.string(), z.any()),
  adset_id: z.string(),
});

const createAdSchema = z.object({
  ad: adSchema,
});

export const validateAdInput = (formData: FormData) => {
  const { ad } = createAdSchema.parse(formData);
  return ad;
};
