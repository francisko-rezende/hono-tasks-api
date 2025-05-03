import { notFound } from '@/middlewares/not-found.js'
import onError from '@/middlewares/on-error.js'
import { pinoLogger } from '@/middlewares/pino-logger.js'
import serveEmojiFavicon from '@/middlewares/serve-emoji.favicon.js'
import { OpenAPIHono } from '@hono/zod-openapi'
import type { AppBindings } from '@/lib/types.js'

export function createApp() {
  const app = new OpenAPIHono<AppBindings>()
  app.use(serveEmojiFavicon('📋'))
  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
