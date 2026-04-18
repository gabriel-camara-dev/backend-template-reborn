import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository.js'
import { RegisterUserUseCase } from '@/use-cases/users/register-user.js'
import { UpdateUserUseCase } from '@/use-cases/users/update-user.js'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user.js'
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile.js'
import { ListUsersUseCase } from '@/use-cases/users/list-users.js'
import { AuthenticateUserUseCase } from '@/use-cases/users/authenticate-user.js'
import { ForgotPasswordUseCase } from '@/use-cases/users/forgot-password.js'
import { ResetPasswordUseCase } from '@/use-cases/users/reset-password.js'

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUserUseCase(usersRepository)
}

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new UpdateUserUseCase(usersRepository)
}

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new DeleteUserUseCase(usersRepository)
}

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new GetUserProfileUseCase(usersRepository)
}

export function makeListUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new ListUsersUseCase(usersRepository)
}

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new AuthenticateUserUseCase(usersRepository)
}

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new ForgotPasswordUseCase(usersRepository)
}

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new ResetPasswordUseCase(usersRepository)
}
