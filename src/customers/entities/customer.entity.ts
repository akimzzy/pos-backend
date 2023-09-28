import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@ObjectType()
export class Customer {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field((type) => [Transaction], { nullable: 'itemsAndList' })
  posts: Transaction[];
}
