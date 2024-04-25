import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import Crypto from 'src/Guard/Crypto.service';
import { CreateUserService } from './createUser.service';
import { CreateUserController } from './createUser.controller';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [CreateUserService, AuthGuard, Crypto],
})
export class CreateUserModule {}
