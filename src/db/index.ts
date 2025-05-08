import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { tasksTable } from './schema'
import { reset, seed } from 'drizzle-seed'
import * as schema from './schema'

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema,
})

async function main() {
  await reset(db, { tasksTable })
  await seed(db, { tasksTable }).refine((f) => ({
    tasksTable: {
      columns: {
        name: f.loremIpsum({ sentencesCount: 1 }),
        createdAt: f.date({ maxDate: '2025-05-07' }),
        updatedAt: f.date({ maxDate: '2025-05-07' }),
      },
    },
  }))
  console.log('db seeded!')
}

main()
