// studio/schemaTypes/eventBannerType.ts
import {defineField, defineType} from 'sanity'

export const eventBannerType = defineType({
  name: 'eventBanner',
  title: 'Event Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title',
      description: 'A title for the event or promotion.',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alternative Text',
      description: 'Important for SEO and accessibility.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      description: 'The full URL the banner should link to (e.g., "https://www.example.com/event").',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      }).required(),
    }),
  ],
})