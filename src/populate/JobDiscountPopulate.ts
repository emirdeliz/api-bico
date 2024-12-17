import { faker } from '@faker-js/faker/locale/en';
import { db } from "../utils/prisma";

export const main = async () => {
  console.log('--- Starting Job Discount ---');
  const data = [];

  const userId = await db.user.findMany({ select: { id: true } });
  const jobTypeId = await db.jobType.findMany({ select: { id: true } });

  for (let i = 0; i < 5; i++) {
    data.push({
      jobTypeId: faker.helpers.arrayElement(jobTypeId).id,
      userId: faker.helpers.arrayElement(userId).id,
      percentage: faker.number.float({ min: 1, max: 30 }),
    });
  }

  await db.jobDiscount.createMany({ data });
  console.log('--- Finished Job Discount ---');
}