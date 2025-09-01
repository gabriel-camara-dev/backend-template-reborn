import { messages } from '@constants/messages'
import { UserRole } from '@prisma/client'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export function verifyUserRole(allowedRoles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!allowedRoles.includes(role)) {
      return reply.status(403).send({ message: messages.errors.forbidden })
    }
  }
}
