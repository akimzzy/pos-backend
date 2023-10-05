import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Branch } from '../../branches/entities/branch.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String, { nullable: true })
  @Exclude()
  password?: string;

  @ManyToOne(() => Branch, (branch) => branch.user)
  @Field(() => [Branch])
  branches: Branch[];

  @CreateDateColumn()
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
