import { Image as SanityImage } from "sanity";

export interface Creator {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "creator";
  name: string;
  bio: {
    english: string;
    hindi?: string;
  };
  profileImage?: SanityImage;
  socialMedia?: Array<{
    platform?: "Instagram" | "YouTube" | "TikTok" | "Twitter" | "LinkedIn" | "Facebook";
    handle?: string;
    url?: string;
    followers?: number;
  }>;
  categories?: string[];
  languages?: string[];
  metrics?: {
    averageEngagementRate?: number;
    averageReachPerPost?: number;
    audienceDemographics?: {
      ageGroups?: string[];
      topLocations?: string[];
      genderDistribution?: {
        male?: number;
        female?: number;
        other?: number;
      };
    };
  };
  pricing?: {
    postRate?: number;
    storyRate?: number;
    videoRate?: number;
  };
  status?: "Active" | "Inactive" | "Pending Verification" | "Verified" | "Blacklisted";
}

export interface Campaign {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "campaign";
  // TODO: Define Campaign type based on its schema
}

export interface ContractTemplate {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "contractTemplate";
  // TODO: Define ContractTemplate type based on its schema
}