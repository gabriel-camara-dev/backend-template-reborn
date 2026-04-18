import { UserPresenter } from '@http/presenters/user-presenter.js'
import { registerSchema } from '@http/schemas/users/register-schema.js'
import { logger } from '@lib/logger/index.js'
import { makeRegisterUserUseCase } from '@/infra/factories/user-factory.js'
import { USER_ROLES } from '@/domain/main/enterprise/entities/user.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, username, password } = registerSchema.parse(request.body)

  const registerUseCase = makeRegisterUserUseCase()

  const result = await registerUseCase.execute({
    name,
    email,
    cpf,
    password,
    username,
    role: USER_ROLES.DEFAULT,
  })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  logger.info({ userId: user.publicId }, 'Researcher registered successfully!')

  reply.status(201).send({ user: UserPresenter.toHTTP(user) })
}

export async function registerAdmin(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, username, password } = registerSchema.parse(request.body)

  const registerUseCase = makeRegisterUserUseCase()

  const result = await registerUseCase.execute({ name, email, cpf, username, password, role: USER_ROLES.ADMIN })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  return reply.status(201).send({ user: UserPresenter.toHTTP(user) })
}
