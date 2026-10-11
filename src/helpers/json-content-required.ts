import type { ZodSchema } from './types.ts'

import { jsonContent } from './json-content.js'

const jsonContentRequired = <T extends ZodSchema>({
  schema,
  description,
}: {
  schema: T
  description: string
}) => {
  return {
    ...jsonContent({ schema, description }),
    required: true,
  }
}

export { jsonContentRequired }
