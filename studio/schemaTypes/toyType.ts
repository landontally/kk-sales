// studio/schemaTypes/toyType.ts
import {defineField, defineType} from 'sanity'
import * as MediaLibrary from 'sanity-plugin-media'

export const toyType = defineType({
  name: 'toy',
  title: 'Toy',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Toy Name',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Toy Type',
      type: 'string',
      options: {
        list: [
          { title: 'Single Plush', value: 'single' },
          { title: 'Medium Plush', value: 'medium' },
          { title: 'Jumbo Plush', value: 'jumbo' },
          { title: 'Plastic Toys', value: 'plastic' },
          { title: 'Beanies', value: 'beanies' },
          { title: 'Collegiate Beanies', value: 'collegiate' },
          { title: 'Watches', value: 'watches' },
          { title: '5" Rubber Balls', value: '5inch_rubber_balls' },
          { title: 'Bulk & Bouncing Balls', value: 'bulk_bouncing_balls' },
          { title: 'Puffer Balls', value: 'puffer_balls' },
          { title: 'Treasure Chests', value: 'treasure_chests' },
          { title: 'Christmas Toys', value: 'christmas_toys' },        
        ],
        layout: 'dropdown', // Optional: Can also be 'radio'
      },
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true, // Enables the hotspot for cropping and positioning
        sources: [
          MediaLibrary.mediaAssetSource,
        ]
      },
      validation: (Rule) => Rule.required(), // Make image required
    }),
    defineField({
      name: 'unitPrice',
      title: 'Price/Unit (e.g., 99.99)',
      type: 'string',
    }),
    defineField({
      name: 'casePrice',
      title: 'Price/Case (e.g., 99.99)',
      type: 'string',
    }),
    defineField({
      name: 'caseQuantity',
      title: 'Amount Per Case',
      type: 'string',
    }),
  ],
})