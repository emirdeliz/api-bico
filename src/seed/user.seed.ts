import { faker } from '@faker-js/faker/locale/pt_BR';
import { getOnlyNumbersFromString } from '../utils/string';
import { DataSource } from 'typeorm';
import { UserModel } from '../modules/user/user.model';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  track?: boolean | undefined;
  async run(dataSource: DataSource): Promise<boolean> {
    const repository = dataSource.getRepository(UserModel);
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

    try {
      for (let i = 0; i < data.length; i++) {
        const added = !!(await repository.findOneBy({ email: data[i].email }))?.email;
        !added && await repository.insert(data[i]);
      }
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  } 
}