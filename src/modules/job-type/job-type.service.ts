import { PrismaClient } from '@prisma/client';
import { ResponseObject, IResponseObject } from '../generic/generic.response';
import { CreateJobTypeInput, JobTypeView } from './job-type.schema';

export interface IJobTypeService { 
  createJobType: (data: CreateJobTypeInput) => Promise<ResponseObject<JobTypeView>>;
  updateJobType: (id: number, data: CreateJobTypeInput) => Promise<IResponseObject<JobTypeView>>;
  getJobTypes: () => Promise<IResponseObject<Array<JobTypeView>>>;
}

export class JobTypeService implements IJobTypeService {
  constructor(public prisma = new PrismaClient()) {}

  createJobType = async (data: CreateJobTypeInput) => {
    try {
      const response = await this.prisma.jobType.create({ data });
      return new ResponseObject<JobTypeView>({ response });
    } catch (error) {
      return new ResponseObject<JobTypeView>({ error: error as Error })
    }
  }

  updateJobType = async (id: number, data: CreateJobTypeInput) => {
    try {
      const response = await this.prisma.jobType.update({ where: { id: Number(id) }, data });
      return new ResponseObject<JobTypeView>({ response });
    } catch (error) {
      return new ResponseObject<JobTypeView>({ error: error as Error })
    }
  }

  getJobTypes = async () => {
    try {
      const response = await this.prisma.jobType.findMany();
      return new ResponseObject<Array<JobTypeView>>({ response });
    } catch (error) {
      return new ResponseObject<Array<JobTypeView>>({ error: error as Error })
    }
  }

  getJobTypeById = async (id: number) => {
    try {
      const response = await this.prisma.jobType.findUnique({ where: { id } });
      return new ResponseObject<JobTypeView | null>({ response });
    } catch (error) {
      return new ResponseObject<JobTypeView | null>({ error: error as Error })
    }
  }
}
