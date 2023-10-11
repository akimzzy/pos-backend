import { CreateItemCategoryInput } from './create-item-category.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemCategoryInput extends PartialType(
  CreateItemCategoryInput,
) {}
