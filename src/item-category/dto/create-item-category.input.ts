import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemCategoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
