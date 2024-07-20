import { FalconService } from 'src/Falcon/Falcon.service';
import { IResponse, IUser } from 'src/Falcon/types';
import { PIX_CODE } from './base64QRCode';

export class PixService {
  private falconService: FalconService;

  constructor() {
    this.falconService = new FalconService();
  }

  getPixCode(): string {
    const pixKey = PIX_CODE.code;

    return pixKey;
  }
}
