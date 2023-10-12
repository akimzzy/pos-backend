import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Customer } from '../../customers/entities/customer.entity';
import {
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionItem } from '../../transaction-item/entities/transaction-item.entity';
import { Stock } from '../../stock/entities/stock.entity';

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

  @OneToMany(() => Stock, (stock) => stock.transaction)
  @Field(() => [Stock])
  stocks: Stock[];

  @CreateDateColumn({ default: new Date() })
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn({ default: new Date() })
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<Transaction>) {
    Object.assign(this, partial);
  }
}
