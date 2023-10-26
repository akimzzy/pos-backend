import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateStockInput } from './dto/create-stock.input';
import { User } from '../users/entities/user.entity';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { TransactionsService } from '../transactions/transactions.service';
import { Transaction } from '../transactions/entities/transaction.entity';
import { VariantService } from '../items/variant.service';
import { StockType } from './dto/stock-type.enum';
import { Variant } from '../items/entities/variant.entity';
import { StockReason } from './dto/stock-reason.enum';

@Injectable()
export class StockService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly manager: EntityManager,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,

    @Inject(forwardRef(() => TransactionsService))
    private readonly transactionService: TransactionsService,
    private readonly variantService: VariantService,
  ) {}

  async create(
    user: User,
    createStockInput: CreateStockInput,
    manager = this.manager,
    variant: Variant = null,
    transaction: Transaction = null,
  ) {
    if (!variant) {
      variant = await this.variantService.findOne(
        createStockInput.variantId,
        user.id,
        manager,
      );
    }

    if (createStockInput.transactionId && !transaction) {
      transaction = await this.transactionService.findOne(
        createStockInput.transactionId,
        user.id,
        manager,
      );
    }

    const stockType = this.reasonToStockType(createStockInput.reason);
    if (
      stockType === StockType.REMOVE &&
      createStockInput.stockQuantity > variant.quantity
    ) {
      throw new BadRequestException(
        `The quantity for ${variant.name} less than the transaction quantity`,
      );
    }

    try {
      let balance = await this.findLastVariantStockBalance(variant.id);
      balance = this.calculateStockBalance(
        balance,
        stockType,
        createStockInput.stockQuantity,
      );

      const newStock = new Stock({
        ...createStockInput,
        transaction,
        variant,
        user,
        balance,
      });
      await manager.update(Variant, variant.id, { quantity: balance });
      return manager.save(newStock);
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while saving stock changes, please try again later or contact support.',
      );
    }
  }

  private reasonToStockType(reason: StockReason): StockType {
    const options = {
      [StockReason.THEFT]: StockType.REMOVE,
      [StockReason.DAMAGED]: StockType.REMOVE,
      [StockReason.EXPIRED]: StockType.REMOVE,
      [StockReason.SOLD]: StockType.REMOVE,
      [StockReason.RECEIVED]: StockType.ADD,
      [StockReason.RETURN]: StockType.ADD,
      [StockReason.RE_COUNT]: StockType.RESET,
    };

    const stockType = options[reason];

    if (stockType !== undefined) {
      return stockType;
    } else {
      throw new BadRequestException('Stock reason not Valid');
    }
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
