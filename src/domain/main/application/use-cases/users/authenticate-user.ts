import { emailSchema } from '@http/schemas/utils/email.js'
import type { Result } from '@/core/result.js'
import { fail, sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@/domain/main/enterprise/entities/user.js'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { compare } from 'bcryptjs'

interface AuthenticateUserUseCaseRequest {
  login: string
  password: string
}

type AuthenticateUserUseCaseResponse = Result<
  InvalidCredentialsError,
  {
    user: User
  }
>

const DUMMY_HASH = '$2a$12$tlPzU0pvKy33GEnCkOCipeNJC1Ho4NHro4XwveiXUM5xChZj3ua9y'

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    login,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    let user: User | null = null

    if (emailSchema.safeParse(login).success) {
      user = await this.usersRepository.findBy({ email: login })
    } else {
      user = await this.usersRepository.findBy({ username: login })
    }

    const hashToCompare = user?.passwordHash || DUMMY_HASH

    const doesPasswordMatch = await compare(password, hashToCompare)

    if (!user || !doesPasswordMatch) {
      return fail(new InvalidCredentialsError())
    }

    return sucess({ user })
  }
}
