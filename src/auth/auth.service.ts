import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateAccountInput } from './dto/create-auth.input';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { LoginResponse } from './responses/login.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await this.compareHash(user.password, pass))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.id };
    return { user, accessToken: this.jwtService.sign(payload) };
  }

  async compareHash(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async hashData(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  public async register(createAccountInput: CreateAccountInput) {
    // Todo: check password strength
    const hash = await this.hashData(createAccountInput.password);
    createAccountInput.password = hash;
    const user = await this.usersService.create(createAccountInput);
    return this.login(user);
  }
}
