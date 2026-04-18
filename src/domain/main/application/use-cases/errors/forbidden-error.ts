import { AppError } from '@/core/errors/app-error.js'
import { ErrorType } from '@/core/types/error-type.js'
import { messages } from '@constants/messages.js'

export class ForbiddenError extends AppError {
  constructor() {
    super(ErrorType.FORBIDDEN, messages.errors.forbidden)
  }
}
