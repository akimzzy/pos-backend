import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Customer } from '../../customers/entities/customer.entity';
import {
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { TransactionItem } from '../../transaction-item/entities/transaction-item.entity';

@ObjectType()
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Int)
  ammount: number;

  @Field(() => [TransactionItem], { nullable: false })
  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.transaction,
  )
  transactionItems: TransactionItem[];

  @Field(() => Customer, { nullable: false })
  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: number;
}
