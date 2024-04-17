import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() userDTO: UserDTO) {
    return this.userService.registerUser(userDTO);
  }
}
