import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

import { UserService } from './User.service';
import { IError, IUser } from 'src/Falcon/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Query('identifier') identifier: string): Promise<IUser | IError> {
    return this.userService.getUser(identifier);
  }
}
