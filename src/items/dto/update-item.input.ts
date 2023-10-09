// import { CreateItemInput } from './create-item.input';
import { Field, InputType } from '@nestjs/graphql';

// export class UpdateItemInput extends PartialType(CreateItemInput) {
@InputType()
export class UpdateItemInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;
}
