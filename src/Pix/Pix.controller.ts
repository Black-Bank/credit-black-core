import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';

import { PixService } from './Pix.service';
import { IPixData } from './base64QRCode';

@Controller('pix')
export class PixController {
  constructor(private readonly PixService: PixService) {}

  @Get('code')
  @UseGuards(AuthGuard)
  getCode(): IPixData {
    return this.PixService.getPixCode();
  }
}
