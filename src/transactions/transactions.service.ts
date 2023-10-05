import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Injectable()
export class TransactionsService {
  create(createTransactionInput: CreateTransactionInput) {
    createTransactionInput;
    return 'This action adds a new transaction';
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  findByCustomer(id: string) {
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
