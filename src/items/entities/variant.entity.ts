import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Item } from './item.entity';
import { TransactionItem } from '../../transaction-item/entities/transaction-item.entity';
import { Stock } from '../../stock/entities/stock.entity';

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

  @Column({ default: true })
  @Field(() => Boolean, { defaultValue: true })
  availableForSale: boolean;

  @Column({ default: true })
  @Field(() => Boolean, { defaultValue: true })
  stockTracking: boolean;

  @OneToMany(() => Stock, (stock) => stock.variant)
  @Field(() => [Stock])
  stocks: Stock[];

  @ManyToOne(() => Item, (item) => item.variants)
  @Field(() => Item)
  item: Item;

  @OneToMany(
    () => TransactionItem,
    (transactionItem) => transactionItem.variant,
  )
  @Field(() => [TransactionItem])
  transactionItems: TransactionItem[];

  @CreateDateColumn({ default: new Date() })
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn({ default: new Date() })
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<Variant>) {
    Object.assign(this, partial);
  }
}
