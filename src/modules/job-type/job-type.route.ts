import { FastifyInstance, FastifyRequest } from 'fastify';
import { JobTypeController } from './job-type.controller';
import { $ref, CreateJobTypeInput } from './job-type.schema';

const jobTypeRoutes = (fastify: FastifyInstance) => {
  const controller = new JobTypeController();
  fastify.post(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('jobTypeInputSchema'),
        response: {
          201: $ref('jobTypeViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobTypeInput, Params: { id: number } }>, reply) => {
      try {
        const result = await controller.createJobType(request);
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
        params: { id: { type: 'number' }},
        body: $ref('jobTypeInputSchema'),
        response: {
          201: $ref('jobTypeViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobTypeInput, Params: { id: number } }>, reply) => {
      try {
        const result = await controller.updateJobType(request);
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
          201: $ref('jobTypesSchema'),
        },
      },
    },
    async (_request, reply) => {
      try {
        const result = await controller.getJobTypes();
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
          201: $ref('jobTypeViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobTypeInput, Params: { id: number } }>, reply) => {
      try {
        const result = await controller.getJobTypeById(request.params.id);
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

export default jobTypeRoutes;
