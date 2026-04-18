import type { CreateUserData, UpdateUserData, User } from '@/domain/main/enterprise/entities/user.js'
import type { PaginatedResults, PaginationParams } from '@/core/types/pagination.js'

export interface TokenData {
  token: string | null
  tokenExpiresAt: Date | null
}

export interface FindUserBy {
  email?: string
  username?: string
  publicId?: string
  token?: string
}

export interface ListUsersQuery extends PaginationParams {
  name?: string
}

export interface UserRepository {
  create(data: CreateUserData): Promise<User>
  findBy(findUserBy: FindUserBy): Promise<User | null>
  list(query: ListUsersQuery): Promise<PaginatedResults<User>>
  updateById(id: number, data: UpdateUserData): Promise<User>
  deleteById(id: number): Promise<User>
}
