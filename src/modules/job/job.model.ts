import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserModel } from '../user/user.model';
import { JobTypeModel } from '../job-type/job-type.model';

@Entity({ name: 'job' })
export class JobModel extends BaseEntity { 
  @PrimaryGeneratedColumn("uuid")
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

  @ManyToOne(() => UserModel, (user) => user.id)
  professional!: UserModel;

  @ManyToOne(() => UserModel, (user) => user.id)
  customer!: UserModel;

  @Column('simple-array', { nullable: true, array: true })
  photos!: Array<string>;

  @ManyToOne(() => JobTypeModel, (jobType) => jobType.id)
  jobType!: JobModel;
    
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt!: Date;
}