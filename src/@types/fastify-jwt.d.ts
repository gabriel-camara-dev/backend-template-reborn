import { UserRole } from '@/domain/main/enterprise/entities/user-role.ts'
import '@fastify/jwt'


declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: UserRole
      sub: string
    }
  }
}
