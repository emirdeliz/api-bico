import { faker } from '@faker-js/faker/locale/en';
import { DataSource } from 'typeorm';
import { JobDiscountModel } from '../modules/job-discount/job-discount.model';
import { UserModel } from '../modules/user/user.model';
import { JobTypeModel } from '../modules/job-type/job-type.model';

export const main = async (datasource: DataSource) => {
  console.log('--- Starting Job Discount ---');
  const repository = datasource.getRepository(JobDiscountModel);
  const repositoryUser = datasource.getRepository(UserModel);
  const repositoryJobType = datasource.getRepository(JobTypeModel);
  await repository.clear();

  const user = await repositoryUser.find();
  const jobType = await repositoryJobType.find();

  for (let i = 0; i < 5; i++) {
    await repository.save({
      jobType: faker.helpers.arrayElement(jobType),
      user: faker.helpers.arrayElement(user),
      percentage: faker.number.float({ min: 1, max: 30 }),
    });
  }

  console.log('--- Finished Job Discount ---');
}