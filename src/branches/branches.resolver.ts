import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BranchesService } from './branches.service';
import { Branch } from './entities/branch.entity';
import { CreateBranchInput } from './dto/create-branch.input';
import { UpdateBranchInput } from './dto/update-branch.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(GqlAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Resolver(() => Branch)
export class BranchesResolver {
  constructor(private readonly branchesService: BranchesService) {}

  @Mutation(() => Branch)
  createBranch(
    @CurrentUser() user: User,
    @Args('createBranchInput')
    createBranchInput: CreateBranchInput,
  ) {
    return this.branchesService.create({
      ...createBranchInput,
      userId: user.id,
    });
  }

  @Query(() => [Branch], { name: 'branches' })
  findAll(@CurrentUser() user: User) {
    return this.branchesService.findAll(user.id);
  }

  @Query(() => Branch, { name: 'branch' })
  findOne(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.branchesService.findOne(id, user);
  }

  @Mutation(() => Branch)
  updateBranch(
    @CurrentUser() user: User,
    @Args('updateBranchInput') updateBranchInput: UpdateBranchInput,
  ) {
    return this.branchesService.update(user, updateBranchInput);
  }

  @Mutation(() => Branch)
  removeBranch(
    @CurrentUser() user: User,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.branchesService.remove(id, user);
  }
}
