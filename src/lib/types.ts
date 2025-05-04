import type { OpenAPIHono, RouteConfig } from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'
import type { RouteHandler } from 'node_modules/@hono/zod-openapi/dist/index.cjs'

export type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouterHandler<TRouteConfig extends RouteConfig> = RouteHandler<
  TRouteConfig,
  AppBindings
>
