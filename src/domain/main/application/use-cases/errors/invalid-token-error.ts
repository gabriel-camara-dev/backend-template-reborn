import { AppError } from '@/core/errors/app-error.js'
import { ErrorType } from '@/core/types/error-type.js'
import { messages } from '@constants/messages.js'

export class InvalidTokenError extends AppError {
  constructor() {
    super(ErrorType.UNAUTHORIZED, messages.errors.invalidToken)
  }
}
