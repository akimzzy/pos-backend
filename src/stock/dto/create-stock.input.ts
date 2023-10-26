import { InputType, Int, Field, ID } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { StockType } from './stock-type.enum';
import { StockReason } from './stock-reason.enum';

@InputType()
export class CreateStockInput {
  @IsUUID()
  @IsNotEmpty()
  @Field(() => ID)
  variantId: string;

  @IsUUID()
  @IsOptional()
  @Field(() => ID, { nullable: true })
  transactionId?: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  stockQuantity: number;

  // @IsNotEmpty()
  // @IsEnum(StockType)
  // @Field(() => StockType)
  // type: StockType;

  @IsNotEmpty()
  @IsEnum(StockReason)
  @Field(() => StockReason)
  reason: StockReason;
}
