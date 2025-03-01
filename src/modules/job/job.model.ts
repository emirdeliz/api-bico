import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn
} from 'typeorm';
import { UserModel } from '../user/user.model';
import { JobTypeModel } from '../job-type/job-type.model';

@Entity()
export class JobModel extends BaseEntity { 
  @ObjectIdColumn({ type: 'uuid' })
  id!: string;

  @Column()
  date!: Date;

  @Column()
  dateService!: Date;

  @Column()
  period!: string;

  @Column()
  observation!: string;

  @Column()
  deadlineEvaluation!: number;

  @Column()
  priceEvaluation!: number;

  @Column()
  qualityEvaluation!: number;

  @Column()
  afterSalesServiceEvaluation!: number;

  @OneToMany(() => UserModel, (user) => user.id)
  professional!: UserModel;

  @OneToMany(() => UserModel, (user) => user.id)
  customer!: UserModel;

  @Column('simple-array', { nullable: true, array: true })
  photos!: Array<string>;

  @OneToMany(() => JobTypeModel, (jobType) => jobType.id)
  jobType!: JobModel;
    
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt!: Date;
}