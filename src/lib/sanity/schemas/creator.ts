export default {
  name: "creator",
  title: "Creator",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bio",
      title: "Bio",
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
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "socialMedia",
      title: "Social Media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
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
              name: "handle",
              title: "Handle/Username",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
            {
              name: "followers",
              title: "Followers Count",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "categories",
      title: "Content Categories",
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
      title: "Content Languages",
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
    {
      name: "metrics",
      title: "Performance Metrics",
      type: "object",
      fields: [
        {
          name: "averageEngagementRate",
          title: "Average Engagement Rate",
          type: "number",
        },
        {
          name: "averageReachPerPost",
          title: "Average Reach Per Post",
          type: "number",
        },
        {
          name: "audienceDemographics",
          title: "Audience Demographics",
          type: "object",
          fields: [
            {
              name: "ageGroups",
              title: "Age Groups",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "topLocations",
              title: "Top Locations",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "genderDistribution",
              title: "Gender Distribution",
              type: "object",
              fields: [
                { name: "male", title: "Male", type: "number" },
                { name: "female", title: "Female", type: "number" },
                { name: "other", title: "Other", type: "number" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "pricing",
      title: "Pricing",
      type: "object",
      fields: [
        {
          name: "postRate",
          title: "Post Rate",
          type: "number",
        },
        {
          name: "storyRate",
          title: "Story Rate",
          type: "number",
        },
        {
          name: "videoRate",
          title: "Video Rate",
          type: "number",
        },
      ],
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          "Active",
          "Inactive",
          "Pending Verification",
          "Verified",
          "Blacklisted",
        ],
      },
    },
  ],
};
