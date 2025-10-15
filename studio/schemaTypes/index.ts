// studio/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import { eventBannerType } from './eventBannerType'
import { heroSlideType } from './heroSlideType'
import { machineType } from './machineType' 
import { toyType } from './toyType'     

export const schemaTypes = [
  eventBannerType,
  heroSlideType,
  machineType, 
  toyType,     
] as const

// If you had other schemas, they would be imported and added here as well.