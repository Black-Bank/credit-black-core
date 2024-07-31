import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

import { PixService } from './Pix.service';
import { IPixData } from './base64QRCode';
import { IPayment, IResponse } from 'src/Falcon/types';
import CryptoService from 'src/Guard/Crypto.service';

@Controller('pix')
export class PixController {
  constructor(
    private readonly pixService: PixService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get('code')
  @UseGuards(AuthGuard)
  getCode(): IPixData {
    return this.pixService.getPixCode();
  }

  @Post('payment')
  @UseGuards(AuthGuard)
  setPayment(@Body('token') token: string): Promise<IResponse> {
    const paymentRequest: IPayment = JSON.parse(
      this.cryptoService.decrypt(token),
    );

    return this.pixService.setPaymentProof(paymentRequest);
  }

  @Get('payments')
  @UseGuards(AuthGuard)
  getPaymentsByIdentifier(
    @Query('identifier') identifier: string,
    @Query('page') page: number = 1,
  ) {
    return this.pixService.getPaymentProof({ identifier, page });
  }
}
