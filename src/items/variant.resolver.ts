import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Variant } from './entities/variant.entity';
import { VariantService } from './variant.service';
import { CreateVariantInput } from './dto/create-variant.input';
import { DeleteResponse } from '../utils/responses/delete-enitity.response';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(GqlAuthGuard)
@Resolver(() => Variant)
export class VariantResolver {
  constructor(private readonly variantService: VariantService) {}

  @Mutation(() => [Variant])
  createVariants(
    @CurrentUser() user: User,
    @Args('itemId') itemId: string,
    @Args('createVariantsInput', {
      type: () => [CreateVariantInput],
    })
    createVariantInput: CreateVariantInput[],
  ) {
    return this.variantService.create(itemId, createVariantInput);
  }

  @Mutation(() => DeleteResponse)
  removeVariants(
    @CurrentUser() user: User,
    @Args('createVariantInput', { type: () => [String] })
    removeVariantsInput: string[],
  ) {
    return this.variantService.remove(user.id, removeVariantsInput);
  }

  @Mutation(() => Variant)
  updateVariant(
    @CurrentUser() user: User,
    @Args('updateVariantInput') updateVariantInput: CreateVariantInput,
    @Args('id') id: string,
  ) {
    return this.variantService.update(id, user.id, updateVariantInput);
  }
}
