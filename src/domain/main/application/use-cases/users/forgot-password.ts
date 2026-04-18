import { randomBytes } from 'node:crypto'
import { emailSchema } from '@http/schemas/utils/email.js'
import type { Result } from '@/core/result.js'
import { fail, sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@/domain/main/enterprise/entities/user.js'
import { UserNotFoundForPasswordResetError } from '@/use-cases/errors/user-not-found-for-password-reset-error.js'

interface ForgotPasswordUseCaseRequest {
  login: string
}

type ForgotPasswordUseCaseResponse = Result<
  UserNotFoundForPasswordResetError,
  {
    user: User
    token: string
  }
>

const EXPIRES_IN_MINUTES = 15
const TOKEN_LENGTH = 32

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    login,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    let userExists: User | null = null

    if (emailSchema.safeParse(login).success) {
      userExists = await this.usersRepository.findBy({ email: login })
    } else {
      userExists = await this.usersRepository.findBy({ username: login })
    }

    const passwordToken = randomBytes(TOKEN_LENGTH).toString('hex')

    const tokenExpiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000)

    const tokenData = {
      token: passwordToken,
      tokenExpiresAt,
    }

    if (!userExists) {
      return fail(new UserNotFoundForPasswordResetError())
    }

    const user = await this.usersRepository.updateById(userExists.id, {
      ...tokenData,
    })

    return sucess({
      user,
      token: passwordToken,
    })
  }
}
