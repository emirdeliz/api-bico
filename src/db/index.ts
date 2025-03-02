import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import dbConnection from 'typeorm-fastify-plugin';

export const registerDb = async(fastify: FastifyInstance) => {
  fastify.register(dbConnection, {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_DATABASE || 'app-bico',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'data@123',
    entities: ['../modules/**/*.model.ts'],
    synchronize: process.env.NODE_ENV === "dev",
    logging: process.env.NODE_ENV === "dev",
  });
}