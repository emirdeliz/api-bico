import { faker } from '@faker-js/faker/locale/en';
import { DataSource } from 'typeorm';
import { JobTypeModel } from '../modules/job-type/job-type.model';

export const main = async (datasource: DataSource) => {
  console.log('--- Starting Job Type Populate ---');
  const repository = datasource.getRepository(JobTypeModel);
  await repository.clear();

  for (let i = 0; i < 18; i++) {
    const jobType = faker.person.jobArea();
    const added = !!(await repository.findOneBy({ name: jobType }));
    if (!added) {
      await repository.save({
        name: jobType,
      });
    }
  }

  console.log('--- Finished Job Type Populate ---');
}