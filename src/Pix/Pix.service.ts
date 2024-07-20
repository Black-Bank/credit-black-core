import { FalconService } from 'src/Falcon/Falcon.service';
import { IResponse, IUser } from 'src/Falcon/types';
import { IPixData, PIX_CODE } from './base64QRCode';

export class PixService {
  private falconService: FalconService;

  constructor() {
    this.falconService = new FalconService();
  }

  getPixCode(): IPixData {
    return PIX_CODE;
  }
}
