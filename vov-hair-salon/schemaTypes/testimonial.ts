import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: '客戶評價',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '顧客名稱',
      type: 'string',
      initialValue: '顧客',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'comment',
      title: '評價內容',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: '星數',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'source',
      title: '來源',
      type: 'string',
      initialValue: 'Google 評論',
      description: '例如：Google 評論、Instagram 私訊、店內回饋',
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      initialValue: 100,
      description: '數字越小越前面。',
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
      title: 'name',
      subtitle: 'comment',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle,
      }
    },
  },
})
