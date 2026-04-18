import { env } from '@env/index.js'
import type { Result } from '@/core/result.js'
import { fail, sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User, UserRole } from '@/domain/main/enterprise/entities/user.js'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
  username: string
  role: UserRole
}

type RegisterUserUseCaseResponse = Result<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    cpf,
    username,
    password,
    role,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const [userWithEmail, userWithUsername, userWithCpf] = await Promise.all([
      this.usersRepository.findBy({ email }),
      this.usersRepository.findBy({ username }),
      this.usersRepository.findBy({ cpf }),
    ])

    if (userWithEmail || userWithUsername || userWithCpf) {
      return fail(new UserAlreadyExistsError())
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await this.usersRepository.create({
      name,
      email,
      cpf,
      username,
      passwordHash,
      role,
    })

    return sucess({ user })
  }
}
