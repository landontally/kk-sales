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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true, // Default new items to be in stock
    }),
    defineField({
      name: 'isNew',
      title: 'Feature on Homepage',
      description: 'Check this to feature this item on the homepage carousels.',
      type: 'boolean',
      initialValue: false,
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
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
        sources: [
          MediaLibrary.mediaAssetSource,
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unitPrice',
      title: 'Price/Unit (e.g., 1.25)',
      type: 'number',
      hidden: ({ document }) => document?.callForPrice === true,
    }),
    defineField({
      name: 'caseQuantity',
      title: 'Amount Per Case',
      type: 'number',
      validation: (Rule) => Rule.integer(),
      hidden: ({ document }) => document?.callForPrice === true,
    }),
    defineField({
      name: 'casePrice',
      title: 'Price/Case (e.g., 99.99)',
      type: 'number',
      hidden: ({ document }) => document?.callForPrice === true,
      validation: (Rule) => Rule.custom((currentValue, context) => {
        const { document } = context
        
        // Don't show any message if the required fields are empty
        if (!document || typeof document.unitPrice !== 'number' || typeof document.caseQuantity !== 'number') {
          return true
        }

        const calculatedPrice = parseFloat((document.unitPrice * document.caseQuantity).toFixed(2));

        // If the box is empty, it's not an "error", so we don't need a message
        if (currentValue === undefined) {
            return `Suggestion: The calculated price is $${calculatedPrice}.`
        }

        if (currentValue !== calculatedPrice) {
            return `Warning: The entered price ($${currentValue}) does not match the calculated price of $${calculatedPrice}.`
        }

        return true
      }).warning() // This .warning() makes the message show up in yellow, not red.
    }),
  ],
})