import { env } from '@env/index.js'
import type { Result } from '@/core/result.js'
import { fail, sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@/domain/main/enterprise/entities/user.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { hash } from 'bcryptjs'

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  email?: string
  username?: string
  cpf?: string
  password?: string
}

type UpdateUserUseCaseResponse = Result<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class UpdateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    publicId,
    password,
    ...data
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.usersRepository.findBy({ publicId })

    if (!userToUpdate) {
      return fail(new ResourceNotFoundError())
    }

    let passwordHash: string | undefined
    let passwordChangedAt: Date | undefined

    if (password) {
      passwordHash = await hash(password, env.HASH_SALT_ROUNDS)
      passwordChangedAt = new Date()
    }

    const user = await this.usersRepository.updateById(userToUpdate.id, {
      passwordHash,
      passwordChangedAt,
      ...data,
    })

    return sucess({ user })
  }
}
