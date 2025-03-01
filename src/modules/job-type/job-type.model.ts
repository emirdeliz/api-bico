import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index
} from 'typeorm';

@Entity()
export class JobTypeModel extends BaseEntity { 
  @ObjectIdColumn({ type: 'uuid' })
  id!: string;

  @Column()
  @Index({ unique: true })
  name!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt!: Date;
}