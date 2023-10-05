import { CreateItemCategoryInput } from './create-item-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemCategoryInput extends PartialType(
  CreateItemCategoryInput,
) {
  @Field(() => Int)
  id: number;
}
