import { FastifyInstance, FastifyRequest } from 'fastify';
import { JobController } from './job.controller';
import { $ref, CreateJobInput } from './job.schema';

const jobRoutes = async (fastify: FastifyInstance) => {
  const controller = new JobController();
  fastify.post(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('jobInputSchema'),
        response: {
          201: $ref('jobViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobInput }>, reply) => {
      try {
        const result = await controller.createJob(request);
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
        body: $ref('jobInputSchema'),
        response: {
          201: $ref('jobViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobInput, Params: { id: number } }>, reply) => {
      try {
        const result = await controller.updateJob(request);
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
          201: $ref('jobsSchema'),
        },
      },
    },
    async (_request, reply) => {
      try {
        const result = await controller.getJobs();
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
          201: $ref('jobViewSchema'),
        },
      },
    },
    async (request: FastifyRequest<{ Body: CreateJobInput, Params: { id: number } }>, reply) => {
      try {
        const result = await controller.getJobById(request.params.id);
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

export default jobRoutes;
