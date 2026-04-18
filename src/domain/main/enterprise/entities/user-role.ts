export const USER_ROLES = {
  ADMIN: 'ADMIN',
  DEFAULT: 'DEFAULT',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export function isValidUserRole(role: unknown): role is UserRole {
  return typeof role === 'string' && Object.values(USER_ROLES).includes(role as UserRole)
}

export function getUserRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    [USER_ROLES.ADMIN]: 'Administrator with full system access',
    [USER_ROLES.DEFAULT]: 'Regular user with standard permissions',
  }
  return descriptions[role]
}
