import * as z from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userInput = {
  // define the common user schema
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is not valid',
    })
    .email(),
  name: z.string(),
  state: z.string(),
  city: z.string(),
  phone: z.string(),
  dddPhone: z.string(),
};

const userView = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

const createUserSchema = z.object({
  ...userInput, // re-use the userCore object
  password: z.string({
    required_error: 'Password is required',
  }),
  salt: z.string(),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userInput,
});

const userViewSchema = z.object({
  ...userInput,
  ...userView,
  password: z.string({
    required_error: 'Password is required',
  }),
  salt: z.string(),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is not valid',
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type UserView = z.infer<typeof userViewSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});
