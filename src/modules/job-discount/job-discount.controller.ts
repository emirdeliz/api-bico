import { FastifyInstance, FastifyRequest } from 'fastify';
import { CreateJobDiscountInput } from './job-discount.schema';
import { JobDiscountModel } from './job-discount.model';
import { ObjectId, Repository } from 'typeorm';

export class JobDiscountController {
  private repository: Repository<JobDiscountModel>;
  constructor(fastify: FastifyInstance) {
    this.repository = fastify.orm.getRepository(JobDiscountModel);
  }
  
  createJobDiscount = async (request: FastifyRequest<{ Body: CreateJobDiscountInput }>) => {
    const jobDiscount = await this.repository.save(request.body);
    return jobDiscount;
  }

  updateJobDiscount = async (request: FastifyRequest<{ Body: CreateJobDiscountInput, Params: { id: string }}>) => {
    const { id } = request.params;
    const jobDiscount = await this.repository.update(new ObjectId(id), request.body);
    return jobDiscount;
  }

  getJobDiscounts = async () => {
    const jobDiscounts = await this.repository.find();
    return jobDiscounts;
  }

  getJobDiscountById = async (id: string) => {
    const jobDiscount = await this.repository.findOneBy({ id });
    return jobDiscount;
  }
}
