import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

import { PixService } from './Pix.service';
import { IPixData } from './base64QRCode';
import { IPayment, IResponse } from 'src/Falcon/types';
import CryptoService from 'src/Guard/Crypto.service';

@Controller('pix')
export class PixController {
  constructor(
    private readonly PixService: PixService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get('code')
  @UseGuards(AuthGuard)
  getCode(): IPixData {
    return this.PixService.getPixCode();
  }

  @Post('payment')
  @UseGuards(AuthGuard)
  setPayment(@Body('token') token: string): Promise<IResponse> {
    const paymentRequest: IPayment = JSON.parse(
      this.cryptoService.decrypt(token),
    );

    return this.PixService.setPaymentProof(paymentRequest);
  }
}
