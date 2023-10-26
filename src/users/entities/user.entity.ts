import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Branch } from '../../branches/entities/branch.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { ItemCategory } from '../../item-category/entities/item-category.entity';
import { Stock } from '../../stock/entities/stock.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

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

  @OneToMany(() => Branch, (branch) => branch.user)
  @Field(() => [Branch])
  branches: Branch[];

  @OneToMany(() => Item, (item) => item.user)
  @Field(() => [Item])
  items: Item[];

  @OneToMany(() => ItemCategory, (it) => it.user)
  @Field(() => [ItemCategory])
  categories: ItemCategory[];

  @OneToMany(() => Stock, (stock) => stock.user)
  @Field(() => [Stock])
  stocks: Stock[];

  @OneToMany(() => Customer, (customer) => customer.user)
  @Field(() => [Customer])
  customers: Customer[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  @Field(() => [Transaction])
  transactions: Transaction[];

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
