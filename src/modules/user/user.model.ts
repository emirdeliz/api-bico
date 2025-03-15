import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'user' })
export class UserModel extends BaseEntity { 
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Index({ unique: true })
  email!: string;

  @Column()
  name!: string;

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

  @Column()
  hash!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt!: Date;
}