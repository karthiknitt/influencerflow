import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

import { Creator, Campaign, ContractTemplate } from "../../types/sanity";

export async function getCreators(): Promise<Creator[]> {
  const query = `*[_type == "creator"]`;
  return client.fetch(query);
}

export async function getCampaigns(): Promise<Campaign[]> {
  const query = `*[_type == "campaign"]`;
  return client.fetch(query);
}

export async function getContractTemplates(): Promise<ContractTemplate[]> {
  const query = `*[_type == "contractTemplate"]`;
  return client.fetch(query);
}
