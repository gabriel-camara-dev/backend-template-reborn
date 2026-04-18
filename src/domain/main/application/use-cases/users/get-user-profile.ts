import type { Result } from '@/core/result.js'
import { fail, sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@/domain/main/enterprise/entities/user.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

interface GetUserProfileUseCaseRequest {
  publicId: string
}

type GetUserProfileUseCaseResponse = Result<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class GetUserProfileUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    publicId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findBy({ publicId })

    if (!user) {
      return fail(new ResourceNotFoundError())
    }

    return sucess({ user })
  }
}
