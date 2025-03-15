import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import JobTypeSeeder from '../seed/job-type.seed';
import UserSeeder from '../seed/user.seed';
import JobSeeder from '../seed/job.seed';
import JobDiscountSeeder from '../seed/job-discount.seed';
import { JobTypeModel } from '../modules/job-type/job-type.model';
import { UserModel } from '../modules/user/user.model';
import { JobModel } from '../modules/job/job.model';
import { JobDiscountModel } from '../modules/job-discount/job-discount.model';

export const dsOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: process.env.DB_DATABASE || 'bico',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'data@123',
  entities: [UserModel, JobTypeModel, JobModel, JobDiscountModel],
  seeds: [UserSeeder, JobTypeSeeder, JobSeeder, JobDiscountSeeder],
  cache: false,
  
};

export const dataSource = new DataSource(dsOptions);