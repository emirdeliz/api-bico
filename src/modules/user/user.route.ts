import { FastifyInstance } from 'fastify';
import { $ref } from './user.schema';
import { UserController } from './user.controller';

async function userRoutes(fastify: FastifyInstance) {
  const controller = new UserController();
  fastify.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    controller.createUser
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    controller.login
  );

  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
    },
    controller.getUsers
  );

  fastify.delete(
    '/logout',
    {
      preHandler: [fastify.authenticate],
    },
    controller.logout
  );
}

export default userRoutes;
