import { UserPresenter } from '@http/presenters/user-presenter.js'
import { logger } from '@lib/logger/index.js'
import { makeListUsersUseCase } from '@/infra/factories/user-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  const listUsers = makeListUsersUseCase()

  const result = await listUsers.execute()

  if (result.isFail()) {
    throw result.value
  }

  const { users } = result.value

  logger.info('Admins retrieved successfully!')

  return reply.status(200).send({ admins: UserPresenter.toHTTP(users) })
}
