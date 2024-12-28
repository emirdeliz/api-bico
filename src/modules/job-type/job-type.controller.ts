import { FastifyRequest } from 'fastify';
import { CreateJobTypeInput } from './job-type.schema';
import { JobTypeService } from './job-type.service';

export class JobTypeController {
  constructor(public jobTypeService = new JobTypeService()) {}
  
  createJobType = async (request: FastifyRequest<{ Body: CreateJobTypeInput }>) => {
    const jobType = await this.jobTypeService.createJobType(request.body);
    return jobType;
  }

  updateJobType = async (request: FastifyRequest<{ Body: CreateJobTypeInput, Params: { id: number }}>) => {
    const { id } = request.params;
    const jobTypes = await this.jobTypeService.updateJobType(id, request.body);
    return jobTypes;
  }

  getJobTypes = async () => {
    const jobTypes = await this.jobTypeService.getJobTypes();
    return jobTypes;
  }

  getJobTypeById = async (id: number) => {
    const jobTypes = await this.jobTypeService.getJobTypeById(id);
    return jobTypes;
  }
}
