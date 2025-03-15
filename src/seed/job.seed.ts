import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { JobModel } from '../modules/job/job.model';
import { UserModel } from '../modules/user/user.model';
import { JobTypeModel } from '../modules/job-type/job-type.model';
import { Seeder } from 'typeorm-extension';

export default class JobSeeder implements Seeder {
  track?: boolean | undefined;
  async run(dataSource: DataSource): Promise<boolean> { 
    const repository = dataSource.getRepository(JobModel);
    const repositoryUser = dataSource.getRepository(UserModel);
    const repositoryJobType = dataSource.getRepository(JobTypeModel);

    const user = await repositoryUser.find();
    const jobType = await repositoryJobType.find();

    for (let i = 0; i < 18; i++) {
      try {
        await repository.insert({
          date: faker.date.past(),
          dateService: faker.date.past(),
          observation: faker.lorem.sentence(),
          period: faker.helpers.arrayElement(['morning', 'afternoon', 'night']),
          deadlineEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
          priceEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
          qualityEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
          afterSalesServiceEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
          photos: undefined,
          customer: () => `'${faker.helpers.arrayElement(user).id}'`,
          professional: () => `'${faker.helpers.arrayElement(user).id}'`,
          jobType: () => `'${faker.helpers.arrayElement(jobType).id}'`
        });
      } catch (e) {
        console.log(e);
        return false;
      }
    }
    return true;
  }
}