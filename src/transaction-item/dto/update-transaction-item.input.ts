import { CreateTransactionItemInput } from './create-transaction-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionItemInput extends PartialType(
  CreateTransactionItemInput,
) {
  @Field(() => Int)
  id: number;
}
