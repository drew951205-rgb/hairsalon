export default {
  name: "news",
  title: "最新消息",
  type: "document",
  fields: [
    {
      name: "title",
      title: "標題",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      title: "摘要",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "發布日期",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "封面圖片",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "圖片替代文字",
          type: "string",
          description: "例如：VOV Hair Salon 嘉義市染髮優惠活動海報",
        },
      ],
    },
    {
      name: "isPublished",
      title: "是否上架",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "image",
    },
  },
};

