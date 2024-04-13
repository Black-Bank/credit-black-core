import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  @UseGuards(AuthGuard)
  getAuthToken(@Body('token') token: string): string {
    console.log(token);
    const email = 'email';
    const password = 'senha';
    return this.authService.auth({ email, password });
  }
}
