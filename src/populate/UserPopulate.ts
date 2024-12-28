import { faker } from '@faker-js/faker/locale/en';
import { db } from "../utils/prisma";
import { getOnlyNumbersFromString } from '../utils/string';

export const main = async () => {
  console.log('--- Starting User Populate ---');
  await db.user.deleteMany();

  const data = [
    {
      email: 'peter@test.com',
      name: 'Peter Cunha',
      password: '123456',
      state: 'SC',
      city: 'Florianópolis',
      phone: '999223189',
      dddPhone: '48',
      salt: '123',
    }, {
      email: 'claudia@test.com',
      name: 'Claudia Silva',
      password: '123456',
      state: 'SC',
      city: 'Jaraguá do Sul',
      phone: '999223111',
      dddPhone: '47',
      salt: '1234',
    }
  ];

  for (let i = 0; i < 18; i++) { 
    data.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      state: faker.location.state({ abbreviated: true }),
      city: faker.location.city(),
      phone: getOnlyNumbersFromString(faker.phone.number({ style: 'national' })) || '',
      dddPhone: String(faker.number.int({ min: 11, max: 99 })),
      salt: String(faker.number.int({ min: 100, max: 999 })),
    });
  }

  await db.user.createMany({ data });
  console.log('--- End User Populate ---');
}