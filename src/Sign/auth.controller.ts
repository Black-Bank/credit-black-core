import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiOperation({ summary: 'Obter token de autenticação' })
  @ApiBody({
    description: 'Credenciais de autenticação do usuário',
    schema: {
      properties: {
        email: {
          example: 'example@example.com',
        },
        password: {
          example: 'senha123',
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  async getAuthToken(@Body() user: AuthDTO): Promise<{ token: string }> {
    return await this.authService.auth(user);
  }
}
