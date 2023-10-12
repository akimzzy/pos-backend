import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  async create(createTransactionInput: CreateTransactionInput) {
    createTransactionInput;
    this.transactionRepository;
    return 'This action adds a new transaction';
  }

  async findAll() {
    return [];
  }

  async findOne(id: string, manager: EntityManager = this.manager) {
    const transaction = await manager.findOne(Transaction, { where: { id } });
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

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
