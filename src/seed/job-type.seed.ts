import { faker } from '@faker-js/faker/locale/pt_BR';
import { DataSource } from 'typeorm';
import { JobTypeModel } from '../modules/job-type/job-type.model';
import { Seeder } from 'typeorm-extension';

export default class JobTypeSeeder implements Seeder {
  track?: boolean | undefined;
  async run(dataSource: DataSource): Promise<boolean> { 
    const repository = dataSource.getRepository(JobTypeModel);

    for (let i = 0; i < 18; i++) {
      try {
        const jobType = faker.person.jobArea();
        const added = !!(await repository.findOneBy({ name: jobType }))?.name;

        !added && await repository.insert({
          name: jobType,
        });
      } catch (e) {
        console.log(e);
        return false;
      }
    }
    return true;
  }
}