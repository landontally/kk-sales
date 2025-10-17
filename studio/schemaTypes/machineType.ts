// studio/schemaTypes/machineType.ts
import {defineField, defineType} from 'sanity'
import * as MediaLibrary from 'sanity-plugin-media'

export const machineType = defineType({
  name: 'machine',
  title: 'Machine',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Machine Name',
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
    // START: ADD THIS NEW FIELD
    defineField({
      name: 'callForPrice',
      title: 'Call for Price',
      description: 'Check this box to hide the price and show a "Contact us" link instead.',
      type: 'boolean',
      initialValue: false, // Default to showing the price
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
    // END: ADD THIS NEW FIELD
    defineField({
      name: 'type',
      // ... (rest of the type field is unchanged)
      title: 'Machine Type',
      type: 'string',
      options: {
        list: [
          { title: 'Crane Machines', value: 'crane' },
          { title: 'Arcade Machines', value: 'arcade' },
          { title: 'Jukeboxes', value: 'jukebox' },
          { title: 'Pinballs', value: 'pinball' },
          { title: 'Pool Tables', value: 'pool' },
          { title: 'Changers', value: 'changer' },
          { title: 'Rides', value: 'ride' },
          { title: 'Redemption', value: 'redemption' },
          { title: 'Bulk Vending', value: 'bulk_vending' },
          { title: 'Air Hockey', value: 'air_hockey' },
          { title: 'Self Merchandisers', value: 'self_merchandiser' },
          { title: 'Reconditioned Equipment', value: 'reconditioned' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'string',
    }),
    defineField({
      name: 'manufacturerWebsite',
      title: 'Manufacturer Website',
      type: 'url',
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
      name: 'price',
      title: 'Price (e.g., 99.99)',
      type: 'number',
      // This `hidden` property is the magic part for the Studio
      hidden: ({ document }) => document?.callForPrice === true,
    }),
  ],
})