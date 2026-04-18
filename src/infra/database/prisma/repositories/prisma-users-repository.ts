import { prisma } from '@lib/prisma/index.js'
import type { UserRepository } from '@/domain/main/application/repositories/users-repository.js'
import type { FindUserBy } from '@/domain/main/application/repositories/users-repository.js'
import type { ListUsersQuery } from '@/domain/main/application/repositories/users-repository.js'
import type { CreateUserData, UpdateUserData, User } from '@/domain/main/enterprise/entities/user.js'
import type { PaginatedResults } from '@/core/types/pagination.js'
import type { Prisma } from '@prisma-types/client.js'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper.js'

export class PrismaUsersRepository implements UserRepository {
  async create(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data: PrismaUserMapper.toPrisma(data),
    })
    return PrismaUserMapper.toDomain(user)
  }

  async findBy(findUserBy: FindUserBy): Promise<User | null> {
    const where = this.mapFindUserByToWhere(findUserBy)

    const user = await prisma.user.findUnique({
      where,
    })

    return user ? PrismaUserMapper.toDomain(user) : null
  }

  async list(query: ListUsersQuery): Promise<PaginatedResults<User>> {
    const currentPage = Math.max(1, query.page ?? 1)
    const perPage = Math.max(1, query.limit ?? 10)

    const where: Prisma.UserWhereInput = query.name
      ? {
          name: {
            contains: query.name,
            mode: 'insensitive',
          },
        }
      : {}

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip: (currentPage - 1) * perPage,
        take: perPage,
      }),
      prisma.user.count({ where }),
    ])

    return {
      data: users.map((user) => PrismaUserMapper.toDomain(user)),
      totalPages: Math.ceil(totalCount / perPage),
      totalCount,
      currentPage,
    }
  }

  async updateById(id: number, data: UpdateUserData): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: PrismaUserMapper.toUpdatePrisma(data),
    })
    return PrismaUserMapper.toDomain(user)
  }

  async deleteById(id: number): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    })
    return PrismaUserMapper.toDomain(user)
  }

  private mapFindUserByToWhere(findUserBy: FindUserBy): Prisma.UserWhereUniqueInput {
    if (findUserBy.email) {
      return { email: findUserBy.email }
    }

    if (findUserBy.username) {
      return { username: findUserBy.username }
    }

    if (findUserBy.publicId) {
      return { publicId: findUserBy.publicId }
    }

    if (findUserBy.token) {
      return { token: findUserBy.token }
    }

    throw new Error('At least one field must be provided for FindUserBy')
  }
}
