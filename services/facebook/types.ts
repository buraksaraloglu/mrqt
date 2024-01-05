import { Prisma } from "@prisma/client";

export interface FacebookCampaignParams {
  name: string;
  status: string;
  buying_type: string;
  objective: string;
  special_ad_categories: string;
  start_time?: string;
  end_time?: string;
  daily_budget: number;
  target: Prisma.JsonValue[];
  campaign_type: string;
}

export interface FacebookAdSetParams {
  name: string;
  status: string;
  targeting: Prisma.JsonValue[];
  billing_event: string;
  bid_amount: number;
  campaign_id: string;
  campaignId: number;
}

export interface FacebookAdParams {
  name: string;
  status: string;
  creative: Prisma.JsonValue[];
  adset_id: string;
  adSetId: number;
}

export interface AdAccount {
  id: string;
  name: string;
  accountId: string;
}

export interface FacebookAdAccount {
  id: string;
  name: string;
  accountId: string;
}

export type CreateFacebookCampaignParams = {
  campaign: FacebookCampaignParams;
  adAccountId: string;
  facebookAccessToken: string;
  userId: string;
};

export type GetFacebookCampaignParams = {
  campaignId: string;
  facebookAccessToken: string;
};

type UpdatedFields = {
  name?: string;
  status?: string;
  buyingType?: string;
  objective?: string;
  specialAdCategories?: string;
  start_time?: string;
  end_time?: string;
  dailyBudget?: number;
  target?: Prisma.JsonValue[];
  campaign_type?: string;
};

export type UpdateFacebookCampaignParams = {
  campaignId?: string;
  updatedFields: UpdatedFields;
  adAccountId?: string;
  facebookAccessToken?: string;
};
