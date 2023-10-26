import { InputType, Int, Field } from '@nestjs/graphql';
import { IsMobilePhone, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @IsMobilePhone()
  @IsPhoneNumber()
  @Field(() => String)
  phone: string;
}
