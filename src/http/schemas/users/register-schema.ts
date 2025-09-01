import { cpfSchema } from '@schemas/utils/cpf'
import { emailSchema } from '@schemas/utils/email'
import { passwordSchema } from '@schemas/utils/password'
import { usernameSchema } from '@schemas/utils/username'
import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(4).max(255),
  username: usernameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  password: passwordSchema,
})

export type registerSchemaType = z.infer<typeof registerSchema>
