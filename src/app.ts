import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fjwt from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

import { jobDiscountSchemas } from './modules/job-discount/job-discount.schema';
import jobDiscountRoutes from './modules/job-discount/job-discount.route';

import { jobSchemas } from './modules/job/job.schema';
import jobRoutes from './modules/job/job.route';

import { jobTypeSchemas } from './modules/job-type/job-type.schema';
import jobTypeRoutes from './modules/job-type/job-type.route';
import { registerDb } from './database';
import { UserPayload } from '../global';

const fastify = Fastify();

registerDb(fastify);

fastify.register(fjwt, {
  secret: process.env.JWT_SECRET || 'imvinojan02061999xxxx',
});

fastify.register(fCookie, {
  secret: process.env.COOKIE_SECRET || 'imvinojan02061999xxxx',
  hook: 'preHandler',
});

fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.cookies.access_token;

  if (!token) {
    return reply.status(401).send({ message: 'Authentication required' });
  }
  const decoded = request.server.jwt.decode(token, { complete: true });
  request.user = decoded as UserPayload;
});

const main = async () => {
  for (const schema of [
    ...userSchemas,
    ...jobDiscountSchemas,
    ...jobSchemas,
    ...jobTypeSchemas
  ]) {
    // It should be before you register your routes
    fastify.addSchema(schema);
  }

  fastify.register(swagger, {});
  fastify.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (_request, _reply, next) { next() },
      preHandler: function (_request, _reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => { return swaggerObject },
    transformSpecificationClone: true
  })

  // Executes Swagger
  fastify.ready((err) => {
    if (err) throw err;
    fastify.swagger();
  });

  fastify.register(userRoutes, { prefix: 'api/users' });
  fastify.register(jobDiscountRoutes, { prefix: 'api/job-discounts' });
  fastify.register(jobRoutes, { prefix: 'api/jobs' });
  fastify.register(jobTypeRoutes, { prefix: 'api/job-types' });

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening at http://localhost:3000');
  } catch (error) {
    console.error(error);
    process.exit(1); // exit as failure
  }
}

main();
