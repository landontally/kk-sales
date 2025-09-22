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
      name: 'type', // <-- New field for the dropdown
      title: 'Machine Type',
      type: 'string',
      options: {
        list: [
          { title: 'Crane Machines', value: 'crane' },
          { title: 'Arcade Machines', value: 'arcade' },
          { title: 'Jukeboxes', value: 'jukebox' },
          { title: 'Pinballs', value: 'pinball' },
          { title: 'Jukeboxes', value: 'jukebox' },
          { title: 'Pool Tables', value: 'pool' },
          { title: 'Changers', value: 'changer' },
          { title: 'Rides', value: 'ride' },
          { title: 'Redemption', value: 'redemption' },
          { title: 'Bulk Vending', value: 'bulk_vending' },
          { title: 'Air Hockey', value: 'air_hockey' },
          { title: 'Self Merchandisers', value: 'self_merchandiser' },
          { title: 'Reconditioned Equipment', value: 'reconditioned' },
        ],
        layout: 'dropdown', // Optional: Can also be 'radio'
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
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'www', 'https', 'mailto', 'tel'],
      }),
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
      name: 'price',
      title: 'Price (e.g., 99.99)',
      type: 'string',
    }),
  ],
})