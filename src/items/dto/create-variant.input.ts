import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVariantInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  quantity: number;
}
