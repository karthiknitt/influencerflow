export default {
  name: "contract",
  title: "Contract Template",
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
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        {
          name: "english",
          title: "English",
          type: "text",
        },
        {
          name: "hindi",
          title: "Hindi",
          type: "text",
        },
      ],
    },
    {
      name: "templateContent",
      title: "Template Content",
      type: "object",
      fields: [
        {
          name: "english",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "hindi",
          title: "Hindi",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
    {
      name: "variables",
      title: "Template Variables",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "key",
              title: "Variable Key",
              type: "string",
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
            {
              name: "type",
              title: "Variable Type",
              type: "string",
              options: {
                list: ["text", "number", "date", "currency", "boolean"],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "required",
              title: "Is Required",
              type: "boolean",
              initialValue: true,
            },
          ],
        },
      ],
    },
    {
      name: "terms",
      title: "Terms and Conditions",
      type: "object",
      fields: [
        {
          name: "english",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "hindi",
          title: "Hindi",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
    {
      name: "category",
      title: "Contract Category",
      type: "string",
      options: {
        list: [
          "Standard Collaboration",
          "Exclusive Partnership",
          "One-time Campaign",
          "Long-term Engagement",
          "Affiliate Marketing",
          "Brand Ambassador",
        ],
      },
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Draft", "Active", "Archived"],
      },
      initialValue: "Draft",
    },
    {
      name: "version",
      title: "Version",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
