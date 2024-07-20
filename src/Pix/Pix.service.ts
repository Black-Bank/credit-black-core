import { FalconService } from 'src/Falcon/Falcon.service';
import { IResponse, IUser } from 'src/Falcon/types';

export class PixService {
  private falconService: FalconService;

  constructor() {
    this.falconService = new FalconService();
  }

  getPixCode(): string {
    const pixKey = 'pix-credit-Black-key-example';

    return pixKey;
  }
}
