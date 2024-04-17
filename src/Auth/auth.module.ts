import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import Crypto from 'src/Guard/Crypto.service';
import { UserService } from 'src/User/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    Crypto,
    UserService,
    JwtService,
    PrismaService,
  ],
})
export class AuthModule {}
