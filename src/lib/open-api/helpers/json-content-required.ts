import type { ZodSchema } from './types.ts'

import { jsonContent } from './json-content.js'

type JsonContentRequiredParams<TSchema> = {
  schema: TSchema
  description: string
}

export const jsonContentRequired = <TSchema extends ZodSchema>({
  schema,
  description,
}: JsonContentRequiredParams<TSchema>) => {
  return {
    ...jsonContent({ schema, description }),
    required: true,
  }
}
