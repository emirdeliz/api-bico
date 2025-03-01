import { FastifyInstance, FastifyRequest } from 'fastify';
import { CreateJobTypeInput } from './job-type.schema';
import { JobTypeModel } from './job-type.model';
import { ObjectId, Repository } from 'typeorm';

export class JobTypeController {
  private repository: Repository<JobTypeModel>;
  constructor(fastify: FastifyInstance) {
    this.repository = fastify.orm.getRepository(JobTypeModel);
  }

  createJobType = async (request: FastifyRequest<{ Body: CreateJobTypeInput }>) => {
    const jobType = await this.repository.save(request.body);
    return jobType;
  }

  updateJobType = async (request: FastifyRequest<{ Body: CreateJobTypeInput, Params: { id: string } }>) => {
    const { id } = request.params;
    const jobType = await this.repository.update(new ObjectId(id), request.body);
    return jobType;
  }

  getJobTypes = async () => {
    const jobTypes = await this.repository.find();
    return jobTypes;
  }

  getJobTypeById = async (id: string) => {
    const jobType = await this.repository.findOneBy({ id });
    return jobType;
  }
}
