import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Customer } from 'src/customers/entities/customer.entity';
import { Item } from 'src/items/entities/item.entity';

@ObjectType()
export class Transaction {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  ammount: string;

  @Field((type) => [Item], { nullable: false })
  items: Item[];

  @Field((type) => Customer, { nullable: false })
  customer: number;
}
