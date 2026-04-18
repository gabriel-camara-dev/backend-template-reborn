import { UserPresenter } from '@http/presenters/user-presenter.js'
import { listUsersQuerySchema } from '@http/schemas/users/list-users-query-schema.js'
import { logger } from '@lib/logger/index.js'
import { makeListUsersUseCase } from '@/infra/factories/user-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const query = listUsersQuerySchema.parse(request.query)

  const listUsers = makeListUsersUseCase()

  const result = await listUsers.execute(query)

  if (result.isFail()) {
    throw result.value
  }

  const { users } = result.value

  logger.info('Users retrieved successfully!')

  return reply.status(200).send({
    ...users,
    data: UserPresenter.toHTTP(users.data),
  })
}
