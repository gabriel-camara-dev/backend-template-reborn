import { z } from 'zod'

export const pageSchema = z.coerce.number().int().positive().optional()

export type PageSchemaType = z.infer<typeof pageSchema>