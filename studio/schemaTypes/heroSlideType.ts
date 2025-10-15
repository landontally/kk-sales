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
      name: 'sortOrder',
      title: 'Sort Order',
      description: 'A number to control the order of the slides. Lower numbers appear first (e.g., 1, 2, 3).',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    // Main Desktop Image (Largest)
    defineField({
      name: 'imageDesktop',
      title: 'Desktop Image (Large Screens)',
      description: 'The main banner for large monitors (e.g., 1920px wide or more). This is required.',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    // Tablet Image (Optional)
    defineField({
      name: 'imageTablet',
      title: 'Tablet Image (Optional)',
      description: 'A version cropped for tablet-sized screens (around 768px to 1024px wide).',
      type: 'image',
      options: { hotspot: true },
    }),
    // Mobile Image (Optional)
    defineField({
        name: 'imageMobile',
        title: 'Mobile Image (Optional)',
        description: 'A vertically-oriented image for small screens (less than 768px wide).',
        type: 'image',
        options: { hotspot: true },
    }),
    defineField({
      name: 'altText',
      title: 'Alternative Text',
      description: 'Important for SEO. Briefly describe the main desktop image.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'link',
        title: 'Link',
        description: 'Optional: A URL to go to when the slide is clicked.',
        type: 'string'
    })
  ],
})