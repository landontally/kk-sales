// studio/schemaTypes/manufacturerType.ts
import {defineField, defineType} from 'sanity'

export const manufacturerType = defineType({
  name: 'manufacturer',
  title: 'Manufacturer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Manufacturer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    // You could add more fields later, like a logo, description, etc.
  ],
  // Optional: Improve preview in the Studio list
  preview: {
    select: {
      title: 'name',
    },
  },
})