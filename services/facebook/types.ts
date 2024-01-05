import { Prisma } from "@prisma/client";
import { AdSet } from "facebook-nodejs-business-sdk";

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
  targeting: FacebookTarget[];
  billing_event: string;
  bid_amount: number;
  campaign_id: string;
}

export interface FacebookAdParams {
  name: string;
  status: string;
  creative: Prisma.JsonValue[];
  adset_id: string;
}

export interface FacebookTarget {
  age_max: number;
  age_min: number;
  genders: number[];
  geo_locations: {
    countries: string[];
  };
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
  fields?: string[];
};

type UpdatedCampaignFields = {
  name?: string;
  status?: string;
  buyingType?: string;
  objective?: string;
  specialAdCategories?: string;
  startTime?: string;
  endTime?: string;
  dailyBudget?: number;
  target?: Prisma.JsonValue[];
  campaignType?: string;
};

export type UpdateFacebookCampaignParams = {
  campaignId?: string;
  updatedFields: UpdatedCampaignFields;
  adAccountId?: string;
  facebookAccessToken?: string;
};

export type CreateFacebookAdSetParams = {
  adSet: Record<keyof Omit<keyof FacebookAdSetParams, "targeting">, string> & {
    targeting: FacebookTarget;
  };
  adAccountId?: string;
  facebookAccessToken: string;
  campaignId: string;
};

export type GetFacebookAdSetParams = {
  adSetId: string;
  facebookAccessToken: string;
  fields?: string[];
};

type UpdatedAdSetFields = {
  name?: string;
  status?: string;
  targeting?: Prisma.JsonValue[];
  billingEvent?: string;
  bidAmount?: number;
};

export type UpdateFacebookAdSetParams = {
  adSetId?: string;
  updatedFields: UpdatedAdSetFields;
  adAccountId?: string;
  facebookAccessToken?: string;
};
