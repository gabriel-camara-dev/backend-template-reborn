import type { Prisma } from '@prisma-types/client.js'
import type { UserModel } from '@prisma-types/models/User.js'
import type { CreateUserData, UpdateUserData, User } from '@/domain/main/enterprise/entities/user.js'
import { USER_ROLES, type UserRole } from '@/domain/main/enterprise/entities/user.js'

export class PrismaUserMapper {
  private static readonly roleMap = new Map<string, UserRole>(
    Object.entries(USER_ROLES).map(([_key, value]) => [value, value as UserRole]),
  )

  static toDomain(raw: UserModel): User {
    const role = PrismaUserMapper.mapPrismaRoleToDomain(raw.role as string)
    return {
      id: raw.id,
      publicId: raw.publicId,
      name: raw.name,
      username: raw.username,
      email: raw.email,
      cpf: raw.cpf,
      passwordHash: raw.passwordHash,
      loginAttempts: raw.loginAttempts,
      lastLogin: raw.lastLogin,
      role,
      token: raw.token,
      tokenExpiresAt: raw.tokenExpiresAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      passwordChangedAt: raw.passwordChangedAt,
    }
  }

  static toPrisma(user: CreateUserData): Prisma.UserCreateInput {
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      passwordHash: user.passwordHash,
      role: user.role,
    }
  }

  static toUpdatePrisma(data: UpdateUserData): Prisma.UserUpdateInput {
    return {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.username !== undefined && { username: data.username }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.cpf !== undefined && { cpf: data.cpf }),
      ...(data.passwordHash !== undefined && { passwordHash: data.passwordHash }),
      ...(data.passwordChangedAt !== undefined && { passwordChangedAt: data.passwordChangedAt }),
      ...(data.token !== undefined && { token: data.token }),
      ...(data.tokenExpiresAt !== undefined && { tokenExpiresAt: data.tokenExpiresAt }),
      ...(data.loginAttempts !== undefined && { loginAttempts: data.loginAttempts }),
      ...(data.lastLogin !== undefined && { lastLogin: data.lastLogin }),
    }
  }

  private static mapPrismaRoleToDomain(role: string): UserRole {
    const mappedRole = PrismaUserMapper.roleMap.get(role)

    if (!mappedRole) {
      throw new Error(`Invalid user role from database: ${role}`)
    }

    return mappedRole
  }
}
