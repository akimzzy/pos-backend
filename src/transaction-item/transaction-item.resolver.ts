import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionItemService } from './transaction-item.service';
import { TransactionItem } from './entities/transaction-item.entity';
import { CreateTransactionItemInput } from './dto/create-transaction-item.input';
import { UpdateTransactionItemInput } from './dto/update-transaction-item.input';

@Resolver(() => TransactionItem)
export class TransactionItemResolver {
  constructor(
    private readonly transactionItemService: TransactionItemService,
  ) {}

  @Mutation(() => TransactionItem)
  createTransactionItem(
    @Args('createTransactionItemInput')
    createTransactionItemInput: CreateTransactionItemInput,
  ) {
    return this.transactionItemService.create(createTransactionItemInput);
  }

  @Query(() => [TransactionItem], { name: 'transactionItem' })
  findAll() {
    return this.transactionItemService.findAll();
  }

  @Query(() => TransactionItem, { name: 'transactionItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionItemService.findOne(id);
  }

  @Mutation(() => TransactionItem)
  updateTransactionItem(
    @Args('updateTransactionItemInput')
    updateTransactionItemInput: UpdateTransactionItemInput,
  ) {
    return this.transactionItemService.update(
      updateTransactionItemInput.id,
      updateTransactionItemInput,
    );
  }

  @Mutation(() => TransactionItem)
  removeTransactionItem(@Args('id', { type: () => Int }) id: number) {
    return this.transactionItemService.remove(id);
  }
}
