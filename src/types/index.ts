export interface BilingualText {
  en: string;
  hi: string;
}

export interface Creator {
  _id: string;
  name: string;
  bio: BilingualText;
  email: string;
  platforms: {
    platform: "instagram" | "youtube" | "twitter" | "linkedin";
    handle: string;
    followers: number;
    engagement_rate: number;
  }[];
  categories: string[];
  preferred_language: "en" | "hi" | "both";
  rates: {
    instagram_post?: number;
    instagram_story?: number;
    youtube_video?: number;
  };
  portfolio: string[];
}

export interface Campaign {
  _id: string;
  title: BilingualText;
  brief: BilingualText;
  budget: number;
  currency: "INR" | "USD";
  timeline: {
    start_date: string;
    end_date: string;
    deliverable_date: string;
  };
  target_audience: {
    age_range: string;
    gender: string;
    location: string;
    interests: string[];
  };
  selected_creators: string[];
  status: "draft" | "active" | "in_progress" | "completed" | "cancelled";
  brand_id: string;
}

export interface ContractTemplate {
  _id: string;
  name: string;
  template_en: string;
  template_hi: string;
  terms: {
    term_en: string;
    term_hi: string;
  }[];
  payment_milestones: {
    milestone: string;
    percentage: number;
    description_en: string;
    description_hi: string;
  }[];
}

export interface Transaction {
  id: string;
  campaign_id: string;
  creator_id: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed" | "refunded";
  payment_gateway_id?: string;
  gateway_response?: Record<string, any>;
  milestone?: string;
  created_at: string;
  updated_at: string;
}

export interface PerformanceMetric {
  id: string;
  campaign_id: string;
  creator_id: string;
  platform: string;
  metric_type: string;
  value: number;
  timestamp: string;
  additional_data?: Record<string, any>;
}
