import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/Guard/AuthGuard.guard';
import { PixController } from './Pix.controller';
import Crypto from 'src/Guard/Crypto.service';
import { PixService } from './Pix.service';

@Module({
  imports: [],
  controllers: [PixController],
  providers: [PixService, AuthGuard, Crypto],
})
export class PixModule {}
