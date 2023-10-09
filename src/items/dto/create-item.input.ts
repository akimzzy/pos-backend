import { InputType, Field } from '@nestjs/graphql';
import { CreateVariantInput } from './create-variant.input';

@InputType()
export class CreateItemInput {
  @Field(() => String, { nullable: true, defaultValue: 'default' })
  category: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [CreateVariantInput], { nullable: true })
  variants: CreateVariantInput[];

  @Field(() => String, { nullable: true })
  userId: string;
}
