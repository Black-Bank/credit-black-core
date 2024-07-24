import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Sign/auth.module';
import { CreateUserModule } from './Signup/createUser.module';
import { UserModule } from './User/User.module';
import { PixModule } from './Pix/Pix.module';
import { ExchangeModule } from './ExchangePriceChecker/ExchangePriceChecker.module';

@Module({
  imports: [
    AuthModule,
    CreateUserModule,
    UserModule,
    PixModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
