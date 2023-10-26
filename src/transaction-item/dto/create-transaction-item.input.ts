import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateTransactionItemInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  variantId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  transactionId: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  quantity: number;
}
