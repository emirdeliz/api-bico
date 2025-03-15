import { faker } from '@faker-js/faker/locale/pt_BR';
import { DataSource } from 'typeorm';
import { JobDiscountModel } from '../modules/job-discount/job-discount.model';
import { UserModel } from '../modules/user/user.model';
import { JobTypeModel } from '../modules/job-type/job-type.model';
import { Seeder } from 'typeorm-extension';

export default class JobDiscountSeeder implements Seeder {
  track?: boolean | undefined;
  async run(dataSource: DataSource): Promise<boolean> { 
    const repository = dataSource.getRepository(JobDiscountModel);
    const repositoryUser = dataSource.getRepository(UserModel);
    const repositoryJobType = dataSource.getRepository(JobTypeModel);

    const user = await repositoryUser.find();
    const jobType = await repositoryJobType.find();

    try {
      for (let i = 0; i < 5; i++) {
        await repository.insert({
          jobType: faker.helpers.arrayElement(jobType),
          user: faker.helpers.arrayElement(user),
          percentage: faker.number.int({ min: 1, max: 30 }),
        });
      }
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }
}