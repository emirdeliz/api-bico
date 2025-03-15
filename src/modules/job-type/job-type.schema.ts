import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const jobTypeInput = {
  name: z.string()
}

const jobTypeView = {
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

const jobTypeInputSchema = z.object({
  ...jobTypeInput,
});

const jobTypeViewSchema = z.object({
  ...jobTypeInput,
  ...jobTypeView,
});

const jobTypesSchema = z.array(jobTypeViewSchema);

export type CreateJobTypeInput = z.infer<typeof jobTypeInputSchema>;

export type JobTypeView = z.infer<typeof jobTypeViewSchema>;

export const { schemas: jobTypeSchemas, $ref } = buildJsonSchemas(
  {
    jobTypeInputSchema,
    jobTypeViewSchema,
    jobTypesSchema,
  },
  {
    $id: 'jobTypeSchemas',
  }
);
