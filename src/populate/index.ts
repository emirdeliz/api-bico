import { DataSource } from 'typeorm';
import { main as userPopulate } from './UserPopulate';
import { main as jobTypePopulate } from './JobTypePopulate';
import { main as jobDiscountPopulate } from './JobDiscountPopulate';
import { main as jobPopulate } from './JobPopulate';
import { JobTypeModel } from '../modules/job-type/job-type.model';
import { UserModel } from '../modules/user/user.model';
import { JobDiscountModel } from '../modules/job-discount/job-discount.model';
import { JobModel } from '../modules/job/job.model';

const main = async () => {
  const datasource = await new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_DATABASE || 'app-bico',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'data@123',
    synchronize: true,
    logging: false,
    entities: [JobTypeModel, UserModel, JobDiscountModel, JobModel],
  }).initialize();

  await jobTypePopulate(datasource);
  await userPopulate(datasource);
  await jobDiscountPopulate(datasource);
  await jobPopulate(datasource);
}

main();