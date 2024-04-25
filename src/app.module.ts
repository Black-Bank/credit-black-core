import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Sign/auth.module';
import { CreateUserModule } from './Signup/createUser.module';

@Module({
  imports: [AuthModule, CreateUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
