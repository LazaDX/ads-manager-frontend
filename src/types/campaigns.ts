export type CampaignStatus = 'active' | 'paused' | 'finished';

export interface Campaign {
  _id: string;
  name: string;
  advertiser: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  impressions: number;
  clicks: number;
}

export interface CampaignStats {
  ctr: number; 
  cpc: number; 
}
