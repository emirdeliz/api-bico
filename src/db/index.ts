import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import dbConnection from 'typeorm-fastify-plugin';

export const registerDb = async(fastify: FastifyInstance) => {
  fastify.register(dbConnection, {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'data@123',
    database: 'app-bico',
    synchronize: true,
    logging: false,
    entities: ['../modules/**/*.model.ts'],
  });
}