import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { tasksTable } from './schema'
import { reset, seed } from 'drizzle-seed'

const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
})

async function main() {
  await reset(db, { tasksTable })
  await seed(db, { tasksTable })
  console.log('db seeded!')
}

main()
