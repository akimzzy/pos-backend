import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  constructor({ email, password, id }) {
    this.email = email;
    this.password = password;
    this.id = id;
  }

  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}
