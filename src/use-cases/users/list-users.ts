import { UserRepository } from '@repositories/users-repository.js'
import { User } from '@/@types/prisma/client.js'

type ListUsersUseCaseResponse = {
  users: User[]
}

export class ListUsersUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.list()

    return { users }
  }
}
