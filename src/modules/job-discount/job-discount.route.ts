import { FastifyInstance, FastifyRequest } from 'fastify';
import { JobDiscountController } from './job-discount.controller';
import { $ref, CreateJobDiscountInput } from './job-discount.schema';

const jobDiscountRoutes = async(fastify: FastifyInstance) => {
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
    async (request: FastifyRequest<{ Body: CreateJobDiscountInput }>, reply) => {
      try {
        const result = await controller.createJobDiscount(request);
        return reply.status(201).send(result);
      } catch (error) {
        console.error(error);
        reply.status(500).send({
          message: 'Internal Server Error',
          error: error,
        });
      }
    }
  );

  fastify.put(
    '/:id',
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
      try {
        const result = await controller.updateJobDiscount(request);
        return reply.status(201).send(result);
      } catch (error) {
        console.error(error);
        reply.status(500).send({
          message: 'Internal Server Error',
          error: error,
        });
      }
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
      try {
        const result = await controller.getJobDiscounts();
        return reply.status(201).send(result);
      } catch (error) {
        console.error(error);
        reply.status(500).send({
          message: 'Internal Server Error',
          error: error,
        });
      }
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
      try {
        const result = await controller.getJobDiscountById(request.params.id);
        return reply.status(201).send(result);
      } catch (error) {
        console.error(error);
        reply.status(500).send({
          message: 'Internal Server Error',
          error: error,
        });
      }
    }
  );
}

export default jobDiscountRoutes;
