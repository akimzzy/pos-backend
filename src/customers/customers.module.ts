import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { TransactionsModule } from '../transactions/transactions.module';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), TransactionsModule],
  providers: [CustomersResolver, CustomersService],
})
export class CustomersModule {}
