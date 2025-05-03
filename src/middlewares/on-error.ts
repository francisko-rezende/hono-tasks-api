import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { env } from '@/env.js'
import { httpStatusCodes } from '@/http-status-codes'

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status
  const statusCode =
    currentStatus !== httpStatusCodes.OK
      ? (currentStatus as ContentfulStatusCode)
      : httpStatusCodes.INTERNAL_SERVER_ERROR
  const nodeEnv = c.env?.NODE_ENV || env.NODE_ENV
  const isProd = nodeEnv === 'production'
  return c.json(
    {
      message: err.message,

      stack: isProd ? undefined : err.stack,
    },
    statusCode,
  )
}

export default onError
