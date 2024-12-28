import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../utils/hash';
import { db } from '../../utils/prisma';
import { IResponseObject, ResponseObject } from '../generic/generic.response';
import { CreateUserInput, UserView } from './user.schema';

export interface IUserService { 
  createUser: (data: CreateUserInput) => Promise<ResponseObject<UserView>>;
  findUserByEmail: (email: string) => Promise<IResponseObject<UserView>>;
  getUsers: () => Promise<IResponseObject<Array<UserView>>>;
}

export class UserService implements IUserService {
  constructor(public prisma = new PrismaClient()) { }

  createUser = async (data: CreateUserInput) => {
    try {
      const response = await this.prisma.user.create({ data });
      return new ResponseObject<UserView>({ response });
    } catch (error) {
      return new ResponseObject<UserView>({ error: error as Error })
    }
  }

  findUserByEmail = async (email: string) => {
    try {
      const response = await this.prisma.user.findUnique({ where: { email } });
      return new ResponseObject<UserView>({ response: response as UserView });
    } catch (error) {
      return new ResponseObject<UserView>({ error: error as Error })
    }
  }

  getUsers = async () => {
    try {
      const response = await this.prisma.user.findMany();
      return new ResponseObject<Array<UserView>>({ response });
    } catch (error) {
      return new ResponseObject<Array<UserView>>({ error: error as Error })
    }
  }
}
