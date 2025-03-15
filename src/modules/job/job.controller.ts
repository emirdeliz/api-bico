import { FastifyInstance, FastifyRequest } from 'fastify';
import { CreateJobInput } from './job.schema';
import { JobModel } from './job.model';
import { ObjectId, Repository } from 'typeorm';

export class JobController {
  private repository: Repository<JobModel>;
  constructor(fastify: FastifyInstance) {
    this.repository = fastify.orm.getRepository(JobModel);
  }
  
  createJob = async (request: FastifyRequest<{ Body: CreateJobInput }>) => {
    const job = await this.repository.save(request.body);
    return job;
  }

  updateJob = async (request: FastifyRequest<{ Body: CreateJobInput, Params: { id: string }}>) => {
    const { id } = request.params;
    const job = await this.repository.update(new ObjectId(id), request.body);
    return job;
  }

  getJobs = async () => {
    const jobs = await this.repository.find({ relations: ['customer', 'professional', 'jobType'] });
    return jobs;
  }

  getJobById = async (id: string) => {
    const job = await this.repository.findOneBy({ id });
    return job;
  }
}
