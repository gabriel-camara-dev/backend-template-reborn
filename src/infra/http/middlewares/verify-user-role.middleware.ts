import { messages } from '@constants/messages.js'
import type { UserRole } from '@/domain/main/enterprise/entities/user.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(allowedRoles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!allowedRoles.includes(role)) {
      return reply.status(403).send({ message: messages.errors.forbidden })
    }
  }
}
