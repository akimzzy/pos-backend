import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAccountInput } from './dto/create-auth.input';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginResponse } from './responses/login.response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context,
  ) {
    return this.authService.login(context.req.user);
  }

  @Mutation(() => Auth)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.authService.register(createAccountInput);
  }
}
