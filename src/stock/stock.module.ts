import { Module, forwardRef } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockResolver } from './stock.resolver';
import { Stock } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from '../transactions/transactions.module';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    forwardRef(() => TransactionsModule),
    ItemsModule,
  ],
  providers: [StockResolver, StockService],
  exports: [StockService],
})
export class StockModule {}
