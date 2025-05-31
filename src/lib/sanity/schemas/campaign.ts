export default {
  name: "campaign",
  title: "Campaign",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        {
          name: "english",
          title: "English",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "hindi",
          title: "Hindi",
          type: "string",
        },
      ],
    },
    {
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        {
          name: "english",
          title: "English",
          type: "text",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "hindi",
          title: "Hindi",
          type: "text",
        },
      ],
    },
    {
      name: "budget",
      title: "Budget",
      type: "object",
      fields: [
        {
          name: "amount",
          title: "Amount",
          type: "number",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "currency",
          title: "Currency",
          type: "string",
          options: {
            list: ["INR", "USD"],
          },
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "timeline",
      title: "Timeline",
      type: "object",
      fields: [
        {
          name: "startDate",
          title: "Start Date",
          type: "datetime",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "endDate",
          title: "End Date",
          type: "datetime",
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "requirements",
      title: "Requirements",
      type: "object",
      fields: [
        {
          name: "platforms",
          title: "Platforms",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              "Instagram",
              "YouTube",
              "TikTok",
              "Twitter",
              "LinkedIn",
              "Facebook",
            ],
          },
        },
        {
          name: "contentTypes",
          title: "Content Types",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: ["Post", "Story", "Video", "Reel", "Tweet"],
          },
        },
        {
          name: "categories",
          title: "Categories",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              "Fashion",
              "Beauty",
              "Lifestyle",
              "Tech",
              "Gaming",
              "Food",
              "Travel",
              "Fitness",
              "Education",
              "Business",
              "Entertainment",
            ],
          },
        },
        {
          name: "languages",
          title: "Languages",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              "English",
              "Hindi",
              "Tamil",
              "Telugu",
              "Bengali",
              "Marathi",
              "Gujarati",
              "Kannada",
              "Malayalam",
            ],
          },
        },
      ],
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Draft", "Published", "In Progress", "Completed", "Cancelled"],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "selectedCreators",
      title: "Selected Creators",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "creator" }],
        },
      ],
    },
    {
      name: "metrics",
      title: "Campaign Metrics",
      type: "object",
      fields: [
        {
          name: "totalReach",
          title: "Total Reach",
          type: "number",
        },
        {
          name: "totalEngagements",
          title: "Total Engagements",
          type: "number",
        },
        {
          name: "averageEngagementRate",
          title: "Average Engagement Rate",
          type: "number",
        },
        {
          name: "totalImpressions",
          title: "Total Impressions",
          type: "number",
        },
        {
          name: "roi",
          title: "ROI",
          type: "number",
        },
      ],
    },
  ],
};
