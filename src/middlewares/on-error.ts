import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { INTERNAL_SERVER_ERROR, OK } from '../http-status-codes.js'
import { env } from '@/env.js'

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status
  const statusCode =
    currentStatus !== OK
      ? (currentStatus as ContentfulStatusCode)
      : INTERNAL_SERVER_ERROR
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
