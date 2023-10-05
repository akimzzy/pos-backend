import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: false })
  user: User;

  @Field(() => String, { nullable: false })
  accessToken: string;
}
