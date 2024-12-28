import { FastifyInstance, FastifyRequest } from 'fastify';
import { JobDiscountController } from './job-discount.controller';
import { $ref, CreateJobDiscountInput } from './job-discount.schema';

const jobDiscountRoutes = (fastify: FastifyInstance) => {
  const controller = new JobDiscountController();
  fastify.post(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('jobDiscountInputSchema'),
        response: {
          201: $ref('jobDiscountViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobDiscountInput, Params: { id: number } }>, reply) => {
      const result = await controller.createJobDiscount(request);
      reply.status(201).send(result);
    }
  );

  fastify.put(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: { id: { type: 'number' }},
        body: $ref('jobDiscountInputSchema'),
        response: {
          201: $ref('jobDiscountViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobDiscountInput, Params: { id: number } }>, reply) => {
      const result = await controller.updateJobDiscount(request);
      reply.status(201).send(result);
    }
  );

  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          201: $ref('jobDiscountsSchema'),
        },
      },
    },
    async (_request, reply) => {
      const result = await controller.getJobDiscounts();
      reply.status(201).send(result);
    }
  );

  fastify.get(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          201: $ref('jobDiscountViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobDiscountInput, Params: { id: number } }>, reply) => {
      const result = await controller.getJobDiscountById(request.params.id);
      reply.status(201).send(result);
    }
  );
}

export default jobDiscountRoutes;
