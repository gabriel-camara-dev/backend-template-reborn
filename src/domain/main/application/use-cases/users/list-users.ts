import type { Result } from '@/core/result.js'
import { sucess } from '@/core/result.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@/domain/main/enterprise/entities/user.js'
import type { ListUsersQuery } from '@/repositories/users-repository.js'
import type { PaginatedResults } from '@/core/types/pagination.js'

type ListUsersUseCaseResponse = Result<
  never,
  {
    users: PaginatedResults<User>
  }
>

export class ListUsersUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(query: ListUsersQuery): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.list(query)

    return sucess({ users })
  }
}
