import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import Crypto from 'src/Guard/Crypto.service';
import { ExchangeController } from './ExchangePriceChecker.controller';
import { ExchangePriceService } from './ExchangePriceChecker.services';

@Module({
  imports: [],
  controllers: [ExchangeController],
  providers: [ExchangePriceService, AuthGuard, Crypto],
})
export class ExchangeModule {}
