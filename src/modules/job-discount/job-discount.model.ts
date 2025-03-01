import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn
} from 'typeorm';
import { JobTypeModel } from "../job-type/job-type.model";
import { UserModel } from "../user/user.model";

Entity()
export class JobDiscountModel extends BaseEntity { 
  @ObjectIdColumn({ type: 'uuid' })
  id!: string;

  @Column()
  percentage!: number;

  @OneToMany(() => JobTypeModel, (jobType) => jobType.id)
  jobType!: JobTypeModel;
  
  @OneToMany(() => UserModel, (user) => user.id)
  user!: UserModel

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt!: Date;
}