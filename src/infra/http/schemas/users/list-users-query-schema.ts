import { z } from 'zod'
import { limitSchema } from '../utils/limit.js'
import { pageSchema } from '../utils/page.js'

export const listUsersQuerySchema = z.object({
  page: pageSchema,
  limit: limitSchema,
  name: z.string().trim().min(1).optional(),
})

export type listUsersQuerySchemaType = z.infer<typeof listUsersQuerySchema>