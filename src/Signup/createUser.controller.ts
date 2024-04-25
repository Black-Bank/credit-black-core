import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import CryptoService from 'src/Guard/Crypto.service';
import { IAuthError, IUser } from 'src/Falcon/types';
import { CreateUserService } from './createUser.service';

import * as bcrypt from 'bcrypt';

@Controller('signup')
export class CreateUserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get('token')
  @UseGuards(AuthGuard)
  getToken(): string {
    return this.createUserService.getToken();
  }

  @Post('user')
  @UseGuards(AuthGuard)
  createUser(@Body('token') token: string): Promise<string | IAuthError> {
    const user: IUser = JSON.parse(this.cryptoService.decrypt(token));

    const userJson = {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      password: bcrypt.hashSync(
        user.password,
        Number(process.env.BCRYPT_ROUND),
      ),
      amount: user.amount,
    };
    return this.createUserService.createUser(userJson);
  }
}
