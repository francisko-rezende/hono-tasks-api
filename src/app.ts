import type { PinoLogger } from 'hono-pino'

import { OpenAPIHono } from '@hono/zod-openapi'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { requestId } from 'hono/request-id'

import { notFound } from '@/middlewares/not-found.js'
import { onError } from '@/middlewares/on-error.js'
import { pinoLogger } from '@/middlewares/pino-logger.js'

type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

expand(config())

const app = new OpenAPIHono<AppBindings>()
app.use(requestId()).use(pinoLogger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.info('wow, log here')
})

app.notFound(notFound)
app.onError(onError)

export { app }
