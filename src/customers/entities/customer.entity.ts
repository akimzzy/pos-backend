import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Transaction } from '../../transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: true })
  name?: string;

  @Column()
  @Field({ nullable: true })
  email?: string;

  @Column()
  @Field({ nullable: true })
  phone?: string;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  @Field(() => [Transaction], { nullable: 'itemsAndList' })
  transactions?: Transaction[];

  @CreateDateColumn({ default: new Date() })
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn({ default: new Date() })
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
