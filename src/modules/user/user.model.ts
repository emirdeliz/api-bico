import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class UserModel extends BaseEntity { 
  @ObjectIdColumn({ type: 'uuid' })
  id!: string;

  @Column()
  @Index({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  state!: string;

  @Column()
  city!: string;

  @Column()
  phone!: string;

  @Column()
  dddPhone!: string;

  @Column()
  salt!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt!: Date;
}