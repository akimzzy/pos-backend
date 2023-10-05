import { Module } from '@nestjs/common';
import { TransactionItemService } from './transaction-item.service';
import { TransactionItemResolver } from './transaction-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionItem } from './entities/transaction-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionItem])],
  providers: [TransactionItemResolver, TransactionItemService],
})
export class TransactionItemModule {}
