import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}
