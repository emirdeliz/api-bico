import { faker } from '@faker-js/faker/locale/pt_BR';
import { getOnlyNumbersFromString } from '../utils/string';
import { DataSource } from 'typeorm';
import { UserModel } from '../modules/user/user.model';
import { Seeder } from 'typeorm-extension';
import { hashPassword } from '../utils/hash';

export default class UserSeeder implements Seeder {
  track?: boolean | undefined;
  async run(dataSource: DataSource): Promise<boolean> {
    const repository = dataSource.getRepository(UserModel);
    const data = [
      {
        email: 'peter@test.com',
        name: 'Peter Cunha',
        state: 'SC',
        city: 'Florianópolis',
        phone: '999223189',
        dddPhone: '48',
        ...hashPassword('123456'),
      }, {
        email: 'claudia@test.com',
        name: 'Claudia Silva',

        state: 'SC',
        city: 'Jaraguá do Sul',
        phone: '999223111',
        dddPhone: '47',
        ...hashPassword('123456'),
      }
    ];

    for (let i = 0; i < 18; i++) {
      data.push({
        email: faker.internet.email(),
        name: faker.person.fullName(),
        state: faker.location.state({ abbreviated: true }),
        city: faker.location.city(),
        phone: getOnlyNumbersFromString(faker.phone.number({ style: 'national' })) || '',
        dddPhone: String(faker.number.int({ min: 11, max: 99 })),
        ...hashPassword(faker.internet.password()),
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