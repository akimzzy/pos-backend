import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Item } from './item.entity';
import { TransactionItem } from '../../transaction-item/entities/transaction-item.entity';

@ObjectType()
@Entity()
export class Variant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  quantity: number;

  @Column()
  @Field(() => Int)
  price: number;

  @ManyToOne(() => Item, (item) => item.variants)
  @Field(() => Item)
  item: Item;

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.variant,
  )
  @Field(() => [TransactionItem])
  transactionItems: TransactionItem[];

  constructor(partial: Partial<Variant>) {
    Object.assign(this, partial);
  }
}
