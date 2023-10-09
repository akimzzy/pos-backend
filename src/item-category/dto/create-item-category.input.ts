import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemCategoryInput {
  @Field(() => String)
  name: string;
}
