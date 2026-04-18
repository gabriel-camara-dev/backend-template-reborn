import type { Result } from '@/core/result.js'
import { sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@/domain/main/enterprise/entities/user.js'

type ListUsersUseCaseResponse = Result<
  never,
  {
    users: User[]
  }
>

export class ListUsersUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.list()

    return sucess({ users })
  }
}
