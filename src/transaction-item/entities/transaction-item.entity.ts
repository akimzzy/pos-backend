import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Variant } from '../../items/entities/variant.entity';

@Entity()
@ObjectType()
export class TransactionItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Variant, (variant) => variant.transactionItems)
  @Field(() => Variant)
  variant: Variant;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionItems)
  @Field(() => Transaction)
  transaction: Transaction;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => Int)
  ammount: number;

  @CreateDateColumn({ default: new Date() })
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn({ default: new Date() })
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<TransactionItem>) {
    Object.assign(this, partial);
  }
}
