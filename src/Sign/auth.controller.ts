import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import CryptoService from 'src/Guard/Crypto.service';
import { IUserSign } from './types';
import { IAuthError } from 'src/Falcon/types';

@Controller('login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get('token')
  @UseGuards(AuthGuard)
  getAuthToken(@Body('token') token: string): Promise<string | IAuthError> {
    const user: IUserSign = JSON.parse(this.cryptoService.decrypt(token));

    const email = user.email;
    const password = user.password;
    const timestamp = user.timestamp;
    return this.authService.auth({ email, password: password, timestamp });
  }
}
