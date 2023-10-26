import { Module, forwardRef } from '@nestjs/common';
import { TransactionItemService } from './transaction-item.service';
import { TransactionItemResolver } from './transaction-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionItem } from './entities/transaction-item.entity';
import { TransactionsModule } from '../transactions/transactions.module';
import { ItemsModule } from '../items/items.module';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionItem]),
    forwardRef(() => TransactionsModule),
    ItemsModule,
    StockModule,
  ],
  providers: [TransactionItemResolver, TransactionItemService],
  exports: [TransactionItemService],
})
export class TransactionItemModule {}
