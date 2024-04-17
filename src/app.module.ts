import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';
import { UserModule } from './User/user.module';
import { PrismaService } from './database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService, JwtService],
})
export class AppModule {}
