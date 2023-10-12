import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StockService } from './stock.service';
import { Stock } from './entities/stock.entity';
import { CreateStockInput } from './dto/create-stock.input';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/auth-user.decorator';

@UseGuards(GqlAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Resolver(() => Stock)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Mutation(() => Stock)
  createStock(
    @CurrentUser() user: User,
    @Args('createStockInput') createStockInput: CreateStockInput,
  ) {
    return this.stockService.create(user, createStockInput);
  }

  @Query(() => [Stock], { name: 'stock' })
  findAll(
    @CurrentUser() user: User,
    @Args('variantId', { nullable: true, type: () => String })
    variantId: string,
  ) {
    return this.stockService.findAll(user, variantId);
  }
}
