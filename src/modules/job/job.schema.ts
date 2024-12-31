import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const jobInput = {
  date: z.date(),
  dateService: z.date(),
  period: z.string().optional(),
  observation: z.string().optional(),
  deadlineEvaluation: z.number(),
  priceEvaluation: z.number(),
  qualityEvaluation: z.number(),
  photos: z.array(z.string()),
  afterSalesServiceEvaluation: z.number(),
  professionalId: z.number(),
  customerId: z.number(),
  jobTypeId: z.number(),
}

const jobView = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

const jobInputSchema = z.object({
  ...jobInput,
});

const jobViewSchema = z.object({
  ...jobInput,
  ...jobView,
});

const jobsSchema = z.array(jobViewSchema);
 
export type CreateJobInput = z.infer<typeof jobInputSchema>;

export type JobView = z.infer<typeof jobViewSchema>;

export const { schemas: jobSchemas, $ref } = buildJsonSchemas(
  {
    jobInputSchema,
    jobViewSchema,
    jobsSchema,
  },
  {
    $id: 'jobSchemas',
  }
);
