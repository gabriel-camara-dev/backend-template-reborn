import { UserPresenter } from '@http/presenters/user-presenter.js'
import { publicIdSchema } from '@http/schemas/utils/public-id-schema.js'
import { logger } from '@lib/logger/index.js'
import { makeGetUserProfileUseCase } from '@/infra/factories/user-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const result = await getUserProfileUseCase.execute({ publicId: request.user.sub })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  logger.info('User profile retrieved successfully!')

  return reply.status(200).send(UserPresenter.toHTTP(user))
}

export async function getUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = publicIdSchema.parse(request.params)

  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const result = await getUserProfileUseCase.execute({ publicId: publicId })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  logger.info('User retrieved successfully!')

  return reply.status(200).send(UserPresenter.toHTTP(user))
}
