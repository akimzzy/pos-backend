import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionItemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
