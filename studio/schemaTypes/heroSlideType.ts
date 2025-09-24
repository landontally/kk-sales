// studio/schemaTypes/heroSlideType.ts
import {defineField, defineType} from 'sanity'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'A title for internal reference (e.g., "Summer Sale Banner")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'The main banner image. Recommended size: 1920x800 pixels.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alternative Text',
      description: 'Important for SEO and accessibility. Briefly describe the image.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'link',
        title: 'Link',
        description: 'Optional: A URL to go to when the slide is clicked (e.g., /toys?filter=jumbo)',
        type: 'string'
    })
  ],
})