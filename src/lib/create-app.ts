import type { PinoLogger } from 'hono-pino'

import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'

import { pinoLogger } from '@/middlewares/pino-logger.js'
import { serveEmojiFavicon } from '@/middlewares/serve-emoji-favicon.js'

type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

function createApp() {
  const app = new OpenAPIHono<AppBindings>()

  app.use(requestId())
  app.use(pinoLogger())
  app.use(serveEmojiFavicon('📋'))

  return app
}
export { createApp }
