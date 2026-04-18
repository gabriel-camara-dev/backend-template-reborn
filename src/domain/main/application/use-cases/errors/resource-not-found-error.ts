import { AppError } from '@/core/errors/app-error.js'
import { ErrorType } from '@/core/types/error-type.js'
import { messages } from '@constants/messages.js'

export class ResourceNotFoundError extends AppError {
  constructor() {
    super(ErrorType.NOT_FOUND, messages.errors.resourceNotFound)
  }
}
