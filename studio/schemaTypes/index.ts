// studio/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'
import { eventBannerType } from './eventBannerType'
import { heroSlideType } from './heroSlideType'
import { machineType } from './machineType'
import { toyType } from './toyType'
import { manufacturerType } from './manufacturerType' // <-- Import here

export const schemaTypes = [
  eventBannerType,
  heroSlideType,
  machineType,
  toyType,
  manufacturerType, // <-- Add here
] as const