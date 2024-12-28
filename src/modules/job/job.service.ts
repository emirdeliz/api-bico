import { PrismaClient } from '@prisma/client';
import { ResponseObject, IResponseObject } from '../generic/generic.response';
import { CreateJobInput, JobView } from './job.schema';

export interface IJobService { 
  createJob: (data: CreateJobInput) => Promise<ResponseObject<JobView>>;
  updateJob: (id: number, data: CreateJobInput) => Promise<IResponseObject<JobView>>;
  getJobs: () => Promise<IResponseObject<Array<JobView>>>;
}

export class JobService implements IJobService {
  constructor(public prisma = new PrismaClient()) {}

  createJob = async (data: CreateJobInput) => {
    try {
      const response = await this.prisma.job.create({ data });
      return new ResponseObject<JobView>({ response: response as JobView });
    } catch (error) {
      return new ResponseObject<JobView>({ error: error as Error })
    }
  }

  updateJob = async (id: number, data: CreateJobInput) => {
    try {
      const response = await this.prisma.job.update({ where: { id: Number(id) }, data });
      return new ResponseObject<JobView>({ response: response as JobView });
    } catch (error) {
      return new ResponseObject<JobView>({ error: error as Error })
    }
  }

  getJobs = async () => {
    try {
      const response = await this.prisma.job.findMany();
      return new ResponseObject<Array<JobView>>({ response: response as Array<JobView> });
    } catch (error) {
      return new ResponseObject<Array<JobView>>({ error: error as Error })
    }
  }

  getJobById = async (id: number) => {
    try {
      const response = await this.prisma.job.findUnique({ where: { id } });
      return new ResponseObject<JobView | null>({ response: response as JobView });
    } catch (error) {
      return new ResponseObject<JobView | null>({ error: error as Error })
    }
  }
}
