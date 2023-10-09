import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemCategoryService } from './item-category.service';
import { ItemCategory } from './entities/item-category.entity';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';
import { CurrentUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';

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

  @Query(() => [ItemCategory], { name: 'itemCategory' })
  findAll() {
    return this.itemCategoryService.findAll();
  }

  @Query(() => ItemCategory, { name: 'itemCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemCategoryService.findOne(id);
  }

  @Mutation(() => ItemCategory)
  updateItemCategory(
    @Args('updateItemCategoryInput')
    updateItemCategoryInput: UpdateItemCategoryInput,
  ) {
    return this.itemCategoryService.update(
      updateItemCategoryInput.id,
      updateItemCategoryInput,
    );
  }

  @Mutation(() => ItemCategory)
  removeItemCategory(@Args('id', { type: () => Int }) id: number) {
    return this.itemCategoryService.remove(id);
  }
}
