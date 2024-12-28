import { FastifyRequest } from 'fastify';
import { CreateJobInput } from './job.schema';
import { JobService } from './job.service';

export class JobController {
  constructor(public jobService = new JobService()) {}
  
  createJob = async (request: FastifyRequest<{ Body: CreateJobInput }>) => {
    const job = await this.jobService.createJob(request.body);
    return job;
  }

  updateJob = async (request: FastifyRequest<{ Body: CreateJobInput, Params: { id: number }}>) => {
    const { id } = request.params;
    const jobs = await this.jobService.updateJob(id, request.body);
    return jobs;
  }

  getJobs = async () => {
    const jobs = await this.jobService.getJobs();
    return jobs;
  }

  getJobById = async (id: number) => {
    const jobs = await this.jobService.getJobById(id);
    return jobs;
  }
}
