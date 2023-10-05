import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteResponse {
  @Field(() => String, { nullable: false })
  message: string;
}
