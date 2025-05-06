import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { tasksTable } from './schema'

const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
})

async function main() {
  const task: typeof tasksTable.$inferInsert = {
    name: 'First seed task',
    done: false,
  }

  await db.insert(tasksTable).values(task)
  console.log('New task created')

  const tasks = await db.select().from(tasksTable)
  console.log(`Getting all tasks from db:`, tasks)
}

main()
