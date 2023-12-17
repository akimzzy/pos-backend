import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../auth/auth-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => User)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
}
