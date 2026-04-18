import { resetPasswordSchema } from '@http/schemas/users/reset-password-schema.js'
import { logger } from '@lib/logger/index.js'
import { makeResetPasswordUseCase } from '@/infra/factories/user-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
  const { password, token } = resetPasswordSchema.parse(request.body)

  const resetPasswordUseCase = makeResetPasswordUseCase()

  const result = await resetPasswordUseCase.execute({ password, token })

  if (result.isFail()) {
    throw result.value
  }

  const { user } = result.value

  logger.info({ userId: user.id }, 'Password changed successfully!')

  return reply.status(200).send({ message: 'Password changed successfully!' })
}
