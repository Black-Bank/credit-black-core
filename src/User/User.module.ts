import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import { UserController } from './User.controller';
import { UserService } from './User.service';

import Crypto from 'src/Guard/Crypto.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, AuthGuard, Crypto],
})
export class UserModule {}
