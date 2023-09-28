import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAccountInput } from './dto/create-auth.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginResponse } from './responses/login.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      // TODO: exclude password
      password;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(createAccountInput: CreateAccountInput) {
    // hash password
    this.usersService.create(createAccountInput);
  }
}
