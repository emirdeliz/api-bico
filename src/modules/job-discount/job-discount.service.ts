import { PrismaClient } from '@prisma/client';
import { ResponseObject, IResponseObject } from '../generic/generic.response';
import { CreateJobDiscountInput, JobDiscountView } from './job-discount.schema';

export interface IJobDiscountService { 
  createJobDiscount: (data: CreateJobDiscountInput) => Promise<ResponseObject<JobDiscountView>>;
  updateJobDiscount: (id: number, data: CreateJobDiscountInput) => Promise<IResponseObject<JobDiscountView>>;
  getJobDiscounts: () => Promise<IResponseObject<Array<JobDiscountView>>>;
}

export class JobDiscountService implements IJobDiscountService {
  constructor(public prisma = new PrismaClient()) {}

  createJobDiscount = async (data: CreateJobDiscountInput) => {
    try {
      const response = await this.prisma.jobDiscount.create({ data });
      return new ResponseObject<JobDiscountView>({ response });
    } catch (error) {
      return new ResponseObject<JobDiscountView>({ error: error as Error })
    }
  }

  updateJobDiscount = async (id: number, data: CreateJobDiscountInput) => {
    try {
      const response = await this.prisma.jobDiscount.update({ where: { id: Number(id) }, data });
      return new ResponseObject<JobDiscountView>({ response });
    } catch (error) {
      return new ResponseObject<JobDiscountView>({ error: error as Error })
    }
  }

  getJobDiscounts = async () => {
    try {
      const response = await this.prisma.jobDiscount.findMany();
      return new ResponseObject<Array<JobDiscountView>>({ response });
    } catch (error) {
      return new ResponseObject<Array<JobDiscountView>>({ error: error as Error })
    }
  }

  getJobDiscountById = async (id: number) => {
    try {
      const response = await this.prisma.jobDiscount.findUnique({ where: { id } });
      return new ResponseObject<JobDiscountView | null>({ response });
    } catch (error) {
      return new ResponseObject<JobDiscountView | null>({ error: error as Error })
    }
  }
}

/*export async function getJobDiscounts() {
  return db.jobDiscount.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}*/
