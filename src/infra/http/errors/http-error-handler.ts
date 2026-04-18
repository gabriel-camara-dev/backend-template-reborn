import { AppError } from '@/core/errors/app-error.js'
import { toHttpStatus } from '@/core/types/error-type.js'
import { messages } from '@constants/messages.js'
import { env } from '@env/index.js'
import { logError } from '@lib/logger/helpers.js'
import { logger } from '@lib/logger/index.js'
import * as Sentry from '@sentry/node'
import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

const INVALID_JSON_BODY_ERROR_CODE = 'FST_ERR_CTP_INVALID_JSON_BODY'

function formatZodValidationErrors(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join('.') : 'body',
    message: issue.message,
    code: issue.code,
  }))
}

function isInvalidJsonBodyError(error: Error) {
  const fastifyError = error as FastifyError

  return (
    error instanceof SyntaxError ||
    fastifyError.code === INVALID_JSON_BODY_ERROR_CODE ||
    (fastifyError.statusCode === 400 && error.message.toLowerCase().includes('json'))
  )
}

export function httpErrorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    const details = formatZodValidationErrors(error)

    logger.debug(
      {
        method: request.method,
        url: request.url,
        details,
      },
      'Validation error occurred',
    )

    return reply.status(400).send({
      message: messages.validation.invalidData,
      errors: details,
    })
  }

  if (isInvalidJsonBodyError(error)) {
    logger.error(
      {
        method: request.method,
        url: request.url,
      },
      'Invalid JSON payload received',
    )

    return reply.status(400).send({
      message: messages.validation.invalidJson,
      errors: [
        {
          field: 'body',
          message: messages.validation.invalidJson,
          code: INVALID_JSON_BODY_ERROR_CODE,
        },
      ],
    })
  }

  if (error instanceof AppError) {
    return reply.status(toHttpStatus(error.type)).send({
      message: error.message,
      type: error.type,
    })
  }

  if (env.NODE_ENV === 'development') {
    logError(
      error,
      {
        method: request.method,
        url: request.url,
      },
      'Unhandled error occurred',
    )
  } else {
    if (env.SENTRY_DSN) {
      Sentry.captureException(error)
    }
    logger.error('Unhandled error occurred')
  }

  return reply.status(500).send({ message: messages.errors.internalServer })
}