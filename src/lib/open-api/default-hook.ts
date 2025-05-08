// import { httpStatusCodes } from '@/http-status-codes'
import { httpStatusCodes } from '@/http-status-codes'
import type { Hook } from '@hono/zod-openapi'
import type { ZodError } from 'zod'

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
  }))
}

// eslint-disable-next-line
export const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    const formattedErrors = formatZodError(result.error)
    const responseStatus = httpStatusCodes.UNPROCESSABLE_ENTITY
    const response = {
      status: responseStatus,
      message: 'Validation failed',
      errors: formattedErrors,
    }

    return c.json(response, responseStatus)
  }
}
