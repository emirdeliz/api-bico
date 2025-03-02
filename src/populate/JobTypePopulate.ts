import { faker } from '@faker-js/faker/locale/en';
import { DataSource } from 'typeorm';
import { JobTypeModel } from '../modules/job-type/job-type.model';

export const main = async (datasource: DataSource) => {
  console.log('--- Starting Job Type Populate ---');
  const repository = datasource.getRepository(JobTypeModel);
  await repository.delete('*');

  for (let i = 0; i < 18; i++) {
    await repository.save({
      name: faker.person.jobArea(),
    });
  }

  console.log('--- Finished Job Type Populate ---');
}