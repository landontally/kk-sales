// studio/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'

import { machineType } from './machineType' // <-- Add this line
import { toyType } from './toyType'     // <-- Add this line

export const schemaTypes = [
  machineType, // <-- Add this line
  toyType,     // <-- Add this line
] as const

// If you had other schemas, they would be imported and added here as well.