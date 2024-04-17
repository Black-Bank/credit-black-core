import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, TokenDTO } from './auth.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiOperation({
    summary: 'Obter token de autenticação',
  })
  @ApiBearerAuth('AUTH_HEADER')
  @ApiBody({
    description: 'Credenciais de autenticação do usuário',
    schema: {
      properties: {
        token: {
          example: 'string',
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  async signIn(@Body() token: TokenDTO): Promise<any> {
    return await this.authService.auth(token);
  }

  @Post('encrypt')
  @ApiOperation({
    summary: 'Obter token para login',
  })
  @ApiBearerAuth('AUTH_HEADER')
  @ApiBody({
    description: 'Credenciais de autenticação do usuário',
    schema: {
      properties: {
        email: {
          example: 'admin@gmail.com',
        },
        password: {
          example: 'senha123',
        },
      },
    },
  })
  async encrypt(@Body() user: AuthDTO) {
    return await this.authService.encrypt(user);
  }

  @Post('decrypt')
  @ApiOperation({
    summary: 'Obter token para login',
  })
  @ApiBearerAuth('AUTH_HEADER')
  @ApiBody({
    description: 'Credenciais de autenticação do usuário',
    schema: {
      properties: {
        token: {
          example: 'string',
        },
      },
    },
  })
  async decrypt(@Body() token: TokenDTO) {
    return await this.authService.decrypt(token.token);
  }
}
