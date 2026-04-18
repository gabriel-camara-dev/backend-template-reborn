import { UserPresenter } from '@http/presenters/user-presenter.js'
import { authenticateSchema } from '@http/schemas/users/authenticate-schema.js'
import { logger } from '@lib/logger/index.js'
import { makeAuthenticateUserUseCase } from '@/infra/factories/user-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  const { login, password } = authenticateSchema.parse(request.body)

  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  const result = await authenticateUserUseCase.execute({ login, password })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  logger.info('User authenticated successfully!')

  const token = await reply.jwtSign({ sub: user.publicId, role: user.role }, { expiresIn: '1d' })

  return reply.status(200).send({ token, user: UserPresenter.toHTTP(user) })
}
