import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { JobTypeModel } from "../job-type/job-type.model";
import { UserModel } from "../user/user.model";

@Entity({ name: 'job_discount' })
export class JobDiscountModel extends BaseEntity { 
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  percentage!: number;

  @ManyToOne(() => JobTypeModel, (jobType) => jobType.id)
  jobType!: JobTypeModel;
  
  @ManyToOne(() => UserModel, (user) => user.id)
  user!: UserModel

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt!: Date;
}