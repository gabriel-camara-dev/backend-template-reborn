import { messages } from '@constants/messages.js'
import { forgotPasswordSchema } from '@http/schemas/users/forgot-password-schema.js'
import { logger } from '@lib/logger/index.js'
import { UserNotFoundForPasswordResetError } from '@/domain/main/application/use-cases/users/errors/user-not-found-for-password-reset-error.js'
import { makeForgotPasswordUseCase } from '@/infra/factories/user-factory.js'
import { makeSendEmailUseCase } from '@/infra/factories/messaging-factory.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { forgotPasswordHtmlTemplate } from '@templates/forgot-password/forgot-password-html.js'
import { forgotPasswordTextTemplate } from '@templates/forgot-password/forgot-password-text.js'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  const { login } = forgotPasswordSchema.parse(request.body)

  const forgotPasswordUseCase = makeForgotPasswordUseCase()

  const result = await forgotPasswordUseCase.execute({ login })

  if (result.isFail()) {
    const error = result.value

    if (error instanceof UserNotFoundForPasswordResetError) {
      return reply.status(200).send({ message: error.message })
    }

    throw error
  }

  const { user, token } = result.value

  const sendEmailUseCase = makeSendEmailUseCase()

  await sendEmailUseCase.execute({
    to: user.email,
    subject: messages.email.passwordRecoverySubject,
    message: forgotPasswordTextTemplate(user.name, token),
    html: forgotPasswordHtmlTemplate(user.name, token),
  })

  logger.info({ targetId: user.publicId }, 'Password reset email sent')

  return reply.status(200).send({ message: messages.info.passwordResetGeneric })
}
