import type { Result } from '@/core/result.js'
import { fail, sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@/domain/main/enterprise/entities/user.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  email?: string
  username?: string
  cpf?: string
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
    ...data
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.usersRepository.findBy({ publicId })

    if (!userToUpdate) {
      return fail(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.updateById(userToUpdate.id, {
      ...data,
    })

    return sucess({ user })
  }
}
