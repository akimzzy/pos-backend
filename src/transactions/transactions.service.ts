import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { TransactionItemService } from '../transaction-item/transaction-item.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly manager: EntityManager,
    private readonly dataSource: DataSource,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly transactionItemsService: TransactionItemService,
    private readonly customerService: CustomersService,
  ) {}

  async create(user: User, createTransactionInput: CreateTransactionInput) {
    return this.dataSource.transaction(async (manager) => {
      let customer: Customer;
      if (createTransactionInput.customerId) {
        customer = await this.customerService.findOne(
          createTransactionInput.customerId,
          user,
        );
      }

      const transaction = new Transaction({ user, customer, amount: 0 });
      await manager.save(transaction);

      await this.transactionItemsService.create(
        user,
        createTransactionInput.items,
        manager,
        transaction,
      );

      return transaction;
    });
  }

  async findAll(user: User) {
    return this.transactionRepository.find({
      where: { user: { id: user.id } },
      relations: {
        customer: true,
        transactionItems: { variant: { item: true } },
      },
      order: { createdDate: 'DESC' },
    });
  }

  async findOne(
    id: string,
    userId?: string,
    manager: EntityManager = this.manager,
  ) {
    const transaction = await manager.findOne(Transaction, {
      where: { id, user: { id: userId } },
    });
    if (!transaction) {
      throw new NotFoundException('transaction not found');
    }
    return transaction;
  }

  async findByCustomer(id: string) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    updateTransactionInput;
    return `This action updates a #${id} transaction`;
  }
}
