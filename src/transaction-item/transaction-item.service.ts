import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateTransactionItemInput } from './dto/create-transaction-item.input';
import { UpdateTransactionItemInput } from './dto/update-transaction-item.input';
import { EntityManager, Repository } from 'typeorm';
import { TransactionItem } from './entities/transaction-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VariantService } from '../items/variant.service';
import { TransactionsService } from '../transactions/transactions.service';
import { User } from '../users/entities/user.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { StockService } from '../stock/stock.service';
import { StockReason } from '../stock/dto/stock-reason.enum';
import { StockType } from '../stock/dto/stock-type.enum';
import { Stock } from '../stock/entities/stock.entity';

@Injectable()
export class TransactionItemService {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(TransactionItem)
    private readonly transactionItemRepository: Repository<TransactionItem>,
    private readonly variantService: VariantService,
    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionService: TransactionsService,
    private readonly stockService: StockService,
  ) {}

  async create(
    user: User,
    createTransactionItemsInput: CreateTransactionItemInput[],
    manager = this.manager,
    transaction: Transaction = null,
  ) {
    const newTransItems: TransactionItem[] = [];
    const stocks: Stock[] = [];
    let totalAmount = 0;
    for (const createTransactionItemInput of createTransactionItemsInput) {
      const { variantId, quantity, transactionId } = createTransactionItemInput;

      if (!transaction) {
        transaction = await this.transactionService.findOne(
          transactionId,
          user.id,
          manager,
        );
      }

      const variant = await this.variantService.findOne(
        variantId,
        user.id,
        manager,
      );

      if (variant.stockTracking) {
        stocks.push(
          await this.stockService.create(
            user,
            {
              reason: StockReason.SOLD,
              stockQuantity: quantity,
              // type: StockType.REMOVE,
              variantId,
              transactionId: transaction.id,
            },
            manager,
            variant,
            transaction,
          ),
        );
      }

      const amount = variant.price * quantity;
      totalAmount += amount;

      newTransItems.push(
        new TransactionItem({ variant, quantity, transaction, amount }),
      );
    }

    await manager.save(newTransItems);
    await manager.update(Transaction, transaction.id, { amount: totalAmount });

    transaction.amount = totalAmount;
    transaction.transactionItems = newTransItems;
    transaction.stocks = stocks;

    return newTransItems;
  }

  findAll() {
    return `This action returns all transactionItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionItem`;
  }

  update(id: number, updateTransactionItemInput: UpdateTransactionItemInput) {
    updateTransactionItemInput;
    return `This action updates a #${id} transactionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionItem`;
  }
}
