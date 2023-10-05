import { CreateBranchInput } from './create-branch.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBranchInput extends PartialType(CreateBranchInput) {
  @Field(() => String)
  id: string;
}
