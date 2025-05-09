import { notFound } from '@/middlewares/not-found.js'
import onError from '@/middlewares/on-error.js'
import { pinoLogger } from '@/middlewares/pino-logger.js'
import serveEmojiFavicon from '@/middlewares/serve-emoji.favicon.js'
import { OpenAPIHono } from '@hono/zod-openapi'
import type { AppBindings } from '@/lib/types.js'
import { defaultHook } from './open-api/default-hook'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export function createApp() {
  const app = createRouter()
  app.use(serveEmojiFavicon('📋'))
  app.use(pinoLogger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
