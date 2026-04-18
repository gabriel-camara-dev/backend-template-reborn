import type { ErrorType } from '@/core/types/error-type.js'

export abstract class AppError extends Error {
  constructor(
    public readonly type: ErrorType,
    message: string,
  ) {
    super(message)
    this.name = new.target.name
  }
}
