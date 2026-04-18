import { AppError } from '@/core/errors/app-error.js'
import { ErrorType } from '@/core/types/error-type.js'
import { messages } from '@constants/messages.js'

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super(ErrorType.CONFLICT, messages.validation.userAlreadyExists)
  }
}
