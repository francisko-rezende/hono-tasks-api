import { drizzle } from 'drizzle-orm/node-postgres'

import { env } from '@/env.js'

import * as schema from './schema.js'

const db = drizzle({
  connection: env.DATABASE_URL,
  casing: 'snake_case',
  schema,
})

export { db }
