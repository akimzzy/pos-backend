import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  address?: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @ManyToOne(() => User, (user) => user.branches)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<Branch>) {
    Object.assign(this, partial);
  }
}
