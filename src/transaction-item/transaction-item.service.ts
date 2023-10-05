import { Injectable } from '@nestjs/common';
import { CreateTransactionItemInput } from './dto/create-transaction-item.input';
import { UpdateTransactionItemInput } from './dto/update-transaction-item.input';

@Injectable()
export class TransactionItemService {
  create(createTransactionItemInput: CreateTransactionItemInput) {
    createTransactionItemInput;
    return 'This action adds a new transactionItem';
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
