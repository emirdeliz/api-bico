import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const jobDiscountInput = {
  jobTypeId: z.number(),
  userId: z.number(),
  percentage: z.number()
}

const jobDiscountView = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

const jobDiscountInputSchema = z.object({
  ...jobDiscountInput,
});

const jobDiscountViewSchema = z.object({
  ...jobDiscountInput,
  ...jobDiscountView,
});

const jobDiscountsSchema = z.array(jobDiscountViewSchema);

export type CreateJobDiscountInput = z.infer<typeof jobDiscountInputSchema>;

export type JobDiscountView = z.infer<typeof jobDiscountViewSchema>;

export const { schemas: jobDiscountSchemas, $ref } = buildJsonSchemas(
  {
    jobDiscountInputSchema,
    jobDiscountViewSchema,
    jobDiscountsSchema,
  },
  {
    $id: 'jobDiscountSchemas',
  }
);
