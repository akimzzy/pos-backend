import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(GqlAuthGuard)
@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(
    @CurrentUser() user: User,
    @Args('createItemInput') createItemInput: CreateItemInput,
  ) {
    return this.itemsService.create({ ...createItemInput, userId: user.id });
  }

  @Query(() => [Item], { name: 'items' })
  findAll(@CurrentUser() user: User) {
    return this.itemsService.findAll(user);
  }

  @Query(() => Item, { name: 'item' })
  findOne(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(
    @CurrentUser() user: User,
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @Args('id') id: string,
  ) {
    return this.itemsService.update(id, updateItemInput, user);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id);
  }
}
