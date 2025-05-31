import creator from "./creator";
import campaign from "./campaign";
import contract from "./contract";

export const schemaTypes = [creator, campaign, contract];

export type Creator = {
  _id: string;
  name: string;
  bio: {
    english: string;
    hindi?: string;
  };
  profileImage?: {
    asset: {
      _ref: string;
    };
  };
  socialMedia: Array<{
    platform: string;
    handle: string;
    url: string;
    followers: number;
  }>;
  categories: string[];
  languages: string[];
  metrics: {
    averageEngagementRate?: number;
    averageReachPerPost?: number;
    audienceDemographics?: {
      ageGroups: string[];
      topLocations: string[];
      genderDistribution: {
        male: number;
        female: number;
        other: number;
      };
    };
  };
  pricing: {
    postRate?: number;
    storyRate?: number;
    videoRate?: number;
  };
  status: string;
};

export type Campaign = {
  _id: string;
  title: {
    english: string;
    hindi?: string;
  };
  brand: {
    _ref: string;
  };
  description: {
    english: string;
    hindi?: string;
  };
  budget: {
    amount: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
  };
  requirements: {
    platforms: string[];
    contentTypes: string[];
    categories: string[];
    languages: string[];
  };
  status: string;
  selectedCreators?: Array<{
    _ref: string;
  }>;
  metrics?: {
    totalReach?: number;
    totalEngagements?: number;
    averageEngagementRate?: number;
    totalImpressions?: number;
    roi?: number;
  };
};

export type ContractTemplate = {
  _id: string;
  title: {
    english: string;
    hindi?: string;
  };
  description?: {
    english?: string;
    hindi?: string;
  };
  templateContent: {
    english: any[];
    hindi?: any[];
  };
  variables: Array<{
    key: string;
    description?: string;
    type: string;
    required: boolean;
  }>;
  terms?: {
    english?: any[];
    hindi?: any[];
  };
  category?: string;
  status: string;
  version: string;
  lastUpdated: string;
};
