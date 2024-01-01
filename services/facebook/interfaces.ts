import { Prisma } from "@prisma/client";

export interface CampaignParams {
  name: string;
  status: string;
  buying_type: string;
  objective: string;
  special_ad_categories: string;
  start_time: string;
  end_time: string;
  daily_budget: number;
  target: Prisma.JsonValue[];
  campaign_type: string;
}

export interface AdSetParams {
  name: string;
  status: string;
  targeting: Prisma.JsonValue[];
  billing_event: string;
  bid_amount: number;
  campaign_id: string;
  campaignId: number;
}

export interface AdParams {
  name: string;
  status: string;
  creative: Prisma.JsonValue[];
  adset_id: string;
  adSetId: number;
}

export interface AdAccount {
  id: string;
  name: string;
  account_id: string;
}
