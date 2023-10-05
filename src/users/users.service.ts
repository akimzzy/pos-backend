import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({ email, password }: CreateUserInput): Promise<User> {
    try {
      let newUser = await this.findOneByEmail(email);
      if (newUser) {
        throw new BadGatewayException(
          'An account with that email already exists, please login.',
        );
      }
      newUser = new User({ email, password });
      return this.usersRepository.save(newUser);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
