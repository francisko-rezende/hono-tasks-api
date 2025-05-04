import type { AppRouterHandler } from '@/lib/types'
import type { ListTasksRoute } from './tasks.routes'

const list: AppRouterHandler<ListTasksRoute> = (c) => {
  return c.json([
    {
      name: 'Learn Hono',
      done: false,
    },
  ])
}

export const tasksHandlers = {
  list,
}
