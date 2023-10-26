import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { Variant } from '../../items/entities/variant.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockType } from '../dto/stock-type.enum';
import { StockReason } from '../dto/stock-reason.enum';

registerEnumType(StockReason, { name: 'StockReason' });
registerEnumType(StockType, { name: 'StockType' });

@Entity()
@ObjectType()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Int)
  stockQuantity: number;

  @Column()
  @Field(() => Int)
  balance: number;

  @ManyToOne(() => User, (user) => user.stocks)
  @Field(() => User)
  user: User;

  @Column({ type: 'enum', enum: StockType })
  @Field(() => StockType)
  type: StockType;

  @Column({ type: 'enum', enum: StockReason })
  @Field(() => StockReason)
  reason: StockReason;

  @ManyToOne(() => Transaction, (transaction) => transaction.stocks)
  @Field(() => Transaction, { nullable: true })
  transaction: Transaction;

  @ManyToOne(() => Variant, (variant) => variant.stocks)
  @Field(() => Variant)
  variant: Variant;

  @CreateDateColumn()
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<Stock>) {
    Object.assign(this, partial);
  }
}
