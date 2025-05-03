import { httpStatusCodes } from '@/http-status-codes'
import { httpStatusPhrase } from '@/http-status-phrases'
import type { NotFoundHandler } from 'hono'

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${httpStatusPhrase.NOT_FOUND} - ${c.req.path}`,
    },
    httpStatusCodes.NOT_FOUND,
  )
}
