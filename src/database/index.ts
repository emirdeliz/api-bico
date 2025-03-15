import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import dbConnection from 'typeorm-fastify-plugin';
import { dsOptions } from './DataSource';

export const registerDb = async(fastify: FastifyInstance) => {
  fastify.register(dbConnection, dsOptions);
}

