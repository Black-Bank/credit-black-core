import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import { ExchangePriceService } from './ExchangePriceChecker.services';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangePriceService: ExchangePriceService) {}

  @Get('prices')
  //@UseGuards(AuthGuard)
  getMe() {
    return this.exchangePriceService.getExhangePrice();
  }
}
