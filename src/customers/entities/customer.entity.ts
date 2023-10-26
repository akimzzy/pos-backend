import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@ObjectType()
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  customerId: string;

  @ManyToOne(() => User, (user) => user.customers)
  @Field(() => User)
  user: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone: string;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  @Field(() => [Transaction], { nullable: 'itemsAndList' })
  transactions: Transaction[];

  @CreateDateColumn()
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial?: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
