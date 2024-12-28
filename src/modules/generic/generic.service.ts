import { PrismaClient, Prisma } from '@prisma/client'
import { ResponseObject, IResponseObject } from './generic.response'
export class GenericServiceSingleton {
  static Instance: any
  constructor(
    public prisma = new PrismaClient().$extends({
      model: {
        $allModels: {
          async createGeneric<T>(
            this: T & { create: Function },
            x: Prisma.Args<T, 'create'>['data']
          ): Promise<IResponseObject<T>> {
            try {
              // const model = Prisma.getExtensionContext(this).name
              const response = await this.create({ data: x })
              return new ResponseObject({ response })
            } catch (error) {
              return new ResponseObject({ error: error as Error })
            }
          },
          async updateGeneric<T>(
            this: T & { update: Function },
            data: Prisma.Args<T, 'update'>['data'],
            id: string
          ): Promise<IResponseObject<T>> {
            try {
              const response = await this.update({ where: { id }, data })
              return new ResponseObject({ response })
            } catch (error) {
              return new ResponseObject({ error: error as Error })
            }
          },
          async deleteGeneric<T>(
            this: T & { delete: Function },
            id: string
          ): Promise<IResponseObject<T>> {
            try {
              const response = await this.delete({ where: { id } })
              return new ResponseObject({ response })
            } catch (error) {
              return new ResponseObject({ error: error as Error })
            }
          },
          async listGeneric<T>(
            this: T & { findMany: Function }
          ): Promise<IResponseObject<T>> {
            try {
              const response = await this.findMany()
              return new ResponseObject({ response })
            } catch (error) {
              return new ResponseObject({ error: error as Error })
            }
          },
          async getByIdGeneric<T>(
            this: T & { findUnique: Function },
            id: string
          ): Promise<IResponseObject<T>> {
            try {
              const response = await this.findUnique({ where: { id } })
              return new ResponseObject({ response })
            } catch (error) {
              return new ResponseObject({ error: error as Error })
            }
          }
        }
      }
    })
  ) {
    if (GenericServiceSingleton.Instance !== undefined) {
      return GenericServiceSingleton.Instance;
    } else {
      GenericServiceSingleton.Instance = this;
    }
    return this;
  }
}