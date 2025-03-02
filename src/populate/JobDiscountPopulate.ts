import { faker } from '@faker-js/faker/locale/en';
import { JobDiscountModel } from '../modules/job-discount/job-discount.model';
import { DataSource } from 'typeorm';
import { UserModel } from '../modules/user/user.model';
import { JobModel } from '../modules/job/job.model';

export const main = async (datasource: DataSource) => {
  console.log('--- Starting Job Discount ---');
  const repository = datasource.getRepository(JobDiscountModel);
  const repositoryUser = datasource.getRepository(UserModel);
  const repositoryJob = datasource.getRepository(JobModel);
  await repository.delete('*');

  const user = await repositoryUser.find();
  const jobType = await repositoryJob.find()

  for (let i = 0; i < 5; i++) {
    await repository.save({
      jobTypeId: faker.helpers.arrayElement(jobType).id,
      userId: faker.helpers.arrayElement(user).id,
      percentage: faker.number.float({ min: 1, max: 30 }),
    });
  }

  console.log('--- Finished Job Discount ---');
}