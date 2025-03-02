import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/en';
import { JobModel } from '../modules/job/job.model';
import { UserModel } from '../modules/user/user.model';
import { JobTypeModel } from '../modules/job-type/job-type.model';

export const main = async (datasource: DataSource) => {
  console.log('--- Starting Job Populate ---');
  const repository = datasource.getRepository(JobModel);
  const repositoryUser = datasource.getRepository(UserModel);
  const repositoryJobType = datasource.getRepository(JobTypeModel);
  await repository.clear();

  const user = await repositoryUser.find();
  const jobType = await repositoryJobType.find();

  for (let i = 0; i < 18; i++) {
    await repository.save({
      date: faker.date.future(),
      dateService: faker.date.future(),
      observation: faker.lorem.sentence(),
      period: faker.helpers.arrayElement(['morning', 'afternoon', 'night']),
      deadlineEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      priceEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      qualityEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      afterSalesServiceEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      photos: [],
      customerId: faker.helpers.arrayElement(user).id,
      professionalId: faker.helpers.arrayElement(user).id,
      jobTypeId: faker.helpers.arrayElement(jobType).id
    });
  }

  console.log('--- Finished Job Populate ---');
}