import { Mutation, Args, Context, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAccountInput } from './dto/create-auth.input';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginResponse } from './responses/login.response';

@Resolver()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  async login(
    @Args('email') _email: string,
    @Args('password') _password: string,
    @Context() context,
  ) {
    return this.authService.login(context.req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Mutation(() => LoginResponse)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.authService.register(createAccountInput);
  }
}
