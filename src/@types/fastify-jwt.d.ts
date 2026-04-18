import '@fastify/jwt'
import { UserRole } from '@/domain/main/enterprise/entities/user-role.ts'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: UserRole
      sub: string
    }
  }
}
