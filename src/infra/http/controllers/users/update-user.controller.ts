import { UserPresenter } from '@http/presenters/user-presenter.js'
import { updateSchema } from '@http/schemas/users/update-schema.js'
import { publicIdSchema } from '@http/schemas/utils/public-id-schema.js'
import { logger } from '@lib/logger/index.js'
import { makeUpdateUserUseCase } from '@/infra/factories/user-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, username } = updateSchema.parse(request.body)

  const updateUserUseCase = makeUpdateUserUseCase()

  const result = await updateUserUseCase.execute({
    publicId: request.user.sub,
    name,
    email,
    cpf,
    username,
  })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  logger.info('User updated successfully!')

  return reply.status(200).send(UserPresenter.toHTTP(user))
}

export async function updateUserByPublicId(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, username } = updateSchema.parse(request.body)
  const { publicId } = publicIdSchema.parse(request.params)

  const updateUserUseCase = makeUpdateUserUseCase()

  const result = await updateUserUseCase.execute({
    publicId,
    name,
    email,
    cpf,
    username,
  })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  logger.info('User updated successfully!')

  return reply.status(200).send(UserPresenter.toHTTP(user))
}
