import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}