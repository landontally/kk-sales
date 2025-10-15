// studio/sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'K&K Sales',
  projectId: '9ffhyrli',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Our singleton document
            S.listItem()
              .title('Event Banner')
              .id('eventBanner')
              .child(
                S.document()
                  .schemaType('eventBanner')
                  .documentId('eventBanner')
              ),
            S.divider(),
            // The rest of our document types
            ...S.documentTypeListItems().filter(
              (listItem) => !['eventBanner'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
    media()
  ],
  schema: {
    types: schemaTypes,
  },
})