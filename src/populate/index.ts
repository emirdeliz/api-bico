import { main as userPopulate } from './UserPopulate';
import { main as jobTypePopulate } from './JobTypePopulate';
import { main as jobDiscountPopulate } from './JobDiscountPopulate';
import { main as jobPopulate } from './JobPopulate';
import { DataSource } from 'typeorm';

const datasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'data@123',
  database: 'app-bico',
  synchronize: true,
  logging: false,
  entities: [__dirname + '\\..\\modules\\**\\*.model.{js,ts}'],
});

console.log(__dirname + '\\..\\modules\\**\\*.model.{js,ts}');

const main = async () => {
  await jobTypePopulate(datasource);
  await userPopulate(datasource);
  await jobDiscountPopulate(datasource);
  await jobPopulate(datasource);
}

main();