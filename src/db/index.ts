import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import dbConnection from 'typeorm-fastify-plugin';

export const registerDb = async(fastify: FastifyInstance) => {
  fastify.register(dbConnection, {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'world',
    synchronize: true,
    logging: false,
    entities: ['../modules/**/*.model.ts'],
  });
}