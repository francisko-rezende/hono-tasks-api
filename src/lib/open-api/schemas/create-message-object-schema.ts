import { z } from '@hono/zod-openapi'

type CreateMessageObjectParams = {
  exampleMessage: string
}

export const createMessageObjectSchema = ({
  exampleMessage,
}: CreateMessageObjectParams) => {
  return z
    .object({
      message: z.string(),
    })
    .openapi({
      example: {
        message: exampleMessage,
      },
    })
}
