import { faker } from '@faker-js/faker/locale/en';
import { db } from "../utils/prisma";

export const main = async () => {
  console.log('--- Starting Job Type Populate ---');
  await db.jobType.deleteMany();

  const data = [];
  for (let i = 0; i < 18; i++) {
    data.push({
      name: faker.person.jobArea(),
    });
  }

  await db.jobType.createMany({ data });
  console.log('--- Finished Job Type Populate ---');
}