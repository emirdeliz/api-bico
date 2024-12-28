import { FastifyRequest } from 'fastify';
import { CreateJobDiscountInput } from './job-discount.schema';
import { JobDiscountService } from './job-discount.service';

export class JobDiscountController {
  constructor(public jobDiscountService = new JobDiscountService()) {}
  
  createJobDiscount = async (request: FastifyRequest<{ Body: CreateJobDiscountInput }>) => {
    const jobDiscount = await this.jobDiscountService.createJobDiscount(request.body);
    return jobDiscount;
  }

  updateJobDiscount = async (request: FastifyRequest<{ Body: CreateJobDiscountInput, Params: { id: number }}>) => {
    const { id } = request.params;
    const jobDiscounts = await this.jobDiscountService.updateJobDiscount(id, request.body);
    return jobDiscounts;
  }

  getJobDiscounts = async () => {
    const jobDiscounts = await this.jobDiscountService.getJobDiscounts();
    return jobDiscounts;
  }

  getJobDiscountById = async (id: number) => {
    const jobDiscounts = await this.jobDiscountService.getJobDiscountById(id);
    return jobDiscounts;
  }
}
