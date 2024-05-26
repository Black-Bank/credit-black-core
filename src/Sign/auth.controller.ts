import { Body, Controller, Put, UseGuards } from '@nestjs/common';
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

  @Put('token')
  @UseGuards(AuthGuard)
  getAuthToken(@Body('token') token: string): Promise<string | IAuthError> {
    const user: IUserSign = JSON.parse(this.cryptoService.decrypt(token));

    console.log(user);

    const identifier = user.identifier;
    const password = user.password;
    const timestamp = user.timestamp;
    return this.authService.auth({ identifier, password: password, timestamp });
  }
}
