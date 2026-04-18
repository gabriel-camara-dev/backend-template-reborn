import type { Result } from '@/core/result.js'
import { fail, sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

interface DeleteUserUseCaseRequest {
  publicId: string
}

type DeleteUserUseCaseResponse = Result<ResourceNotFoundError, null>

export class DeleteUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ publicId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const userExists = await this.usersRepository.findBy({ publicId })

    if (!userExists) {
      return fail(new ResourceNotFoundError())
    }

    await this.usersRepository.deleteById(userExists.id)

    return sucess(null)
  }
}
