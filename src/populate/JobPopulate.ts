import { faker } from '@faker-js/faker/locale/en';
import { db } from "../utils/prisma";

export const main = async () => {
  console.log('--- Starting Job Populate ---');
  const data = [];

  const userId = await db.user.findMany({ select: { id: true } });
  const jobTypeId = await db.jobType.findMany({ select: { id: true } });

  for (let i = 0; i < 18; i++) {
    data.push({
      date: faker.date.future(),
      dateService: faker.date.future(),
      observation: faker.lorem.sentence(),
      period: faker.helpers.arrayElement(['morning', 'afternoon', 'night']),
      deadlineEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      priceEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      qualityEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      afterSalesServiceEvaluation: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      photos: [],
      customerId: faker.helpers.arrayElement(userId).id,
      professionalId: faker.helpers.arrayElement(userId).id,
      jobTypeId: faker.helpers.arrayElement(jobTypeId).id
    });
  }

  await db.job.createMany({ data });
  console.log('--- Finished Job Populate ---');
}