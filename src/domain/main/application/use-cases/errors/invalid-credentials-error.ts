import { AppError } from '@/core/errors/app-error.js'
import { ErrorType } from '@/core/types/error-type.js'
import { messages } from '@constants/messages.js'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(ErrorType.BAD_REQUEST, messages.errors.invalidCredentials)
  }
}
