import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBranchInput {
  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  userId: string;
}
