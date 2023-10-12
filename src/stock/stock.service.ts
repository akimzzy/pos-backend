import { Injectable } from '@nestjs/common';
import { CreateStockInput } from './dto/create-stock.input';
import { User } from '../users/entities/user.entity';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TransactionsService } from '../transactions/transactions.service';
import { Transaction } from '../transactions/entities/transaction.entity';
import { VariantService } from '../items/variant.service';
import { StockType } from './dto/stock-type.enum';

@Injectable()
export class StockService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    private readonly transactionService: TransactionsService,
    private readonly variantService: VariantService,
  ) {}

  async create(user: User, createStockInput: CreateStockInput) {
    return this.dataSource.transaction(async (manager) => {
      const variant = await this.variantService.findOne(
        createStockInput.variantId,
        user.id,
        manager,
      );

      let balance = await this.findLastVariantStockBalance(variant.id);
      balance = this.calculateStockBalance(
        balance,
        createStockInput.type,
        createStockInput.stockQuantity,
      );

      let transaction: Transaction;
      if (createStockInput.transactionId) {
        transaction = await this.transactionService.findOne(
          createStockInput.transactionId,
          manager,
        );
      }

      const newStock = new Stock({
        ...createStockInput,
        transaction,
        variant,
        user,
        balance,
      });

      return await manager.save(newStock);
    });
  }

  private calculateStockBalance(
    balance: number,
    type: StockType,
    count: number,
  ) {
    if (!balance) balance = 0;
    if (typeof balance !== 'number') balance = Number(balance);
    if (typeof count !== 'number') count = Number(count);

    if (type === StockType.ADD) {
      return balance + count;
    } else if (type === StockType.REMOVE) {
      return balance - count;
    } else {
      return count;
    }
  }

  async findAll(user: User, variantId?: string) {
    return this.stockRepository.find({
      where: { variant: { id: variantId }, user: { id: user.id } },
      order: { createdDate: 'DESC' },
    });
  }

  async findLastVariantStock(variantId: string) {
    return this.stockRepository.findOne({
      where: { variant: { id: variantId } },
      order: { createdDate: 'DESC' },
    });
  }
  async findLastVariantStockBalance(variantId: string) {
    const lastStock = await this.findLastVariantStock(variantId);
    return lastStock?.balance || 0;
  }
}
