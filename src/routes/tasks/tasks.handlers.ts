import type { AppRouteHandler } from '@/lib/types.js'

import type { ListRoute } from './tasks.routes.js'

const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([
    {
      name: 'Learn hono',
      done: false,
    },
  ])
}

export { list }
