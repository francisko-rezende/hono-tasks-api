import type { z } from '@hono/zod-openapi'

// eslint-disable-next-line
// @ts-expect-error
export type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>
