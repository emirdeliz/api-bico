import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from './user.schema';
import { UserService } from './user.service';
import { verifyPassword } from '../../utils/hash';

export class UserController {
  constructor(public userService = new UserService()) { }
  
  createUser = async (request: FastifyRequest<{ Body: CreateUserInput }>) => { 
    const user = await this.userService.createUser(request.body);
    return user;
  }

  login = async (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => {
    const body = request.body;

    // Find a user by email
    const user = (await this.userService.findUserByEmail(body.email)).response;

    if (!user) {
      return reply.status(401).send({
        message: 'Password or e-mail address is incorrect. Try again!',
      });
    }

    // Verify password
    const isValidPassword = verifyPassword({
      candidatePassword: body.password,
      salt: user.salt,
      hash: user.password,
    });

    if (!isValidPassword) {
      return reply.status(401).send({
        message: 'Password or e-mail address is incorrect. Try again!',
      });
    }

    // Generate access token
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const token = request.jwt.sign(payload);

    reply.setCookie('access_token', token, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
    });

    return { accessToken: token };
  }

  logout = async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie('access_token');
    return reply.status(201).send({ message: 'Logout successfully' });
  }

  getUsers = async () => {
    const users = await this.userService.getUsers();
    return users;
  }
}