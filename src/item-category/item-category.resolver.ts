import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemCategoryService } from './item-category.service';
import { ItemCategory } from './entities/item-category.entity';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';
import { CurrentUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DeleteResponse } from '../utils/responses/delete-enitity.response';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(GqlAuthGuard)
@Resolver(() => ItemCategory)
export class ItemCategoryResolver {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  @Mutation(() => ItemCategory)
  createItemCategory(
    @CurrentUser() user: User,
    @Args('createItemCategoryInput')
    createItemCategoryInput: CreateItemCategoryInput,
  ) {
    return this.itemCategoryService.create(user, createItemCategoryInput);
  }

  @Query(() => [ItemCategory], { name: 'itemCategories' })
  findAll(@CurrentUser() user: User) {
    return this.itemCategoryService.findAll(user);
  }

  @Query(() => ItemCategory, { name: 'itemCategory' })
  findOne(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.itemCategoryService.findOne(id, user.id);
  }

  @Mutation(() => ItemCategory)
  updateItemCategory(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('updateItemCategoryInput')
    updateItemCategoryInput: UpdateItemCategoryInput,
  ) {
    return this.itemCategoryService.update(user, id, updateItemCategoryInput);
  }

  @Mutation(() => ItemCategory)
  addItemsToCategory(
    @CurrentUser() user: User,
    @Args('itemIds', { type: () => [String] })
    itemIds: string[],
    @Args('categoryId')
    categoryId: string,
  ) {
    return this.itemCategoryService.addItemsToCategory(
      user,
      itemIds,
      categoryId,
    );
  }

  @Mutation(() => DeleteResponse)
  removeItemsCategory(@CurrentUser() user: User, @Args('id') id: string) {
    return this.itemCategoryService.remove(user, id);
  }
}
