import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import Crypto from 'src/Guard/Crypto.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, Crypto],
})
export class AuthModule {}
