import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  @UseGuards(AuthGuard)
  getAuthToken(@Body() user: AuthDTO): { token: string } {
    return this.authService.auth(user);
  }
}
