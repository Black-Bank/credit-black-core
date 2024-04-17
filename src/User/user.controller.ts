import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Cadastro de usuário',
  })
  @ApiBody({
    description: 'Credenciais de autenticação do usuário',
    schema: {
      properties: {
        name: {
          example: 'Usuário',
        },
        email: {
          example: 'example@example.com',
        },
        password: {
          example: 'senha123',
        },
      },
    },
  })
  @Post('signup')
  signup(@Body() userDTO: UserDTO) {
    return this.userService.registerUser(userDTO);
  }
}
