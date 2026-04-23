import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: '最新消息',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: '摘要',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '網址代稱',
      type: 'slug',
      description: '按 Generate 自動產生，會變成單篇最新消息網址。',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'content',
      title: '內文',
      type: 'text',
      rows: 8,
      description: '單篇最新消息頁面的詳細內容，可以留空，前台會先顯示摘要。',
    }),
    defineField({
      name: 'publishedAt',
      title: '發布日期',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: '封面圖片',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: '圖片替代文字',
          type: 'string',
          description: '例如：VOV Hair Salon 嘉義市染髮優惠活動海報',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: '更多照片',
      type: 'array',
      description: '單篇最新消息可以放多張照片，前台會用左右箭頭切換。',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: '圖片替代文字',
              type: 'string',
              description: '例如：VOV Hair Salon 嘉義市染髮活動現場照片',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isPublished',
      title: '是否上架',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'image',
    },
  },
})
