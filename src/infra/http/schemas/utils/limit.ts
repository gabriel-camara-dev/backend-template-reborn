import { z } from 'zod'

export const limitSchema = z.coerce.number().int().positive().optional().default(10)

export type LimitSchemaType = z.infer<typeof limitSchema>