import { Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { User } from '../users/entities/user.entity';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  create(createCustomerInput: CreateCustomerInput) {
    this.customerRepository.save({});
    createCustomerInput;
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customers`;
  }

  async findOne(id: string, user: User) {
    return this.customerRepository.findOne({
      where: { id, user: { id: user.id } },
    });
  }

  update(id: number, updateCustomerInput: UpdateCustomerInput) {
    updateCustomerInput;
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
