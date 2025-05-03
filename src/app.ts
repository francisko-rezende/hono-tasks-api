import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound } from './middlewares/not-found.js'
import onError from './middlewares/on-error.js'
import { pinoLogger } from './middlewares/pino-logger.js'
import type { PinoLogger } from 'hono-pino'

type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export const app = new OpenAPIHono<AppBindings>()

app.use(pinoLogger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.debug('degug')
  throw new Error('errou!')
})

app.notFound(notFound)
app.onError(onError)
