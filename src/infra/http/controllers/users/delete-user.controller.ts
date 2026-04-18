import { publicIdSchema } from '@http/schemas/utils/public-id-schema.js'
import { logger } from '@lib/logger/index.js'
import { makeDeleteUserUseCase } from '@/infra/factories/user-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserUseCase = makeDeleteUserUseCase()

  const result = await deleteUserUseCase.execute({
    publicId: request.user.sub,
  })

  if (result.isFail()) {
    throw result.value
  }

  logger.info('User deleted successfully!')

  return reply.status(204).send()
}

export async function deleteUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = publicIdSchema.parse(request.params)

  const deleteUserUseCase = makeDeleteUserUseCase()

  const result = await deleteUserUseCase.execute({
    publicId,
  })

  if (result.isFail()) {
    throw result.value
  }

  logger.info({ targetId: publicId }, 'User deleted successfully!')

  return reply.status(204).send()
}
