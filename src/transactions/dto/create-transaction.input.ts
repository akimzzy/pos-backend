import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateTransactionItemInput } from '../../transaction-item/dto/create-transaction-item.input';

@InputType()
export class CreateTransactionInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  customerId: string;

  @IsString()
  @IsNotEmpty()
  @IsArray()
  @Field(() => [CreateTransactionItemInput])
  items: CreateTransactionItemInput[];
}
