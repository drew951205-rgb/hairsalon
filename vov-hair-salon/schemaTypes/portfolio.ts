import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: '作品集',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '作品名稱',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '作品分類',
      type: 'string',
      options: {
        list: [
          {title: '剪髮作品', value: '剪髮作品'},
          {title: '燙髮作品', value: '燙髮作品'},
          {title: '染髮作品', value: '染髮作品'},
          {title: '頭皮護理作品', value: '頭皮護理作品'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: '作品簡介',
      type: 'string',
    }),
    defineField({
      name: 'stylist',
      title: '設計師',
      type: 'string',
    }),
    defineField({
      name: 'note',
      title: '備註',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: '封面圖片',
      type: 'image',
      description: '作品列表會先顯示這張圖片。',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: '圖片替代文字',
          type: 'string',
          description: '例如：VOV Hair Salon - 女生霧感染髮作品，設計師 OOO。',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: '更多作品照片',
      type: 'array',
      description: '同一個作品案例可以放更多角度，客人點進作品後可左右滑動觀看。',
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
              description: '描述這張照片的髮型、髮色或角度，有助於 SEO。',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      description: '數字越小越前面。',
      initialValue: 100,
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
      subtitle: 'category',
      media: 'image',
    },
  },
})
