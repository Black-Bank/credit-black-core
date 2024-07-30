import { FalconService } from 'src/Falcon/Falcon.service';
import { IPayment, IResponse, IUser } from 'src/Falcon/types';
import { IPixData, PIX_CODE } from './base64QRCode';
import { v4 as uuidv4 } from 'uuid';

export class PixService {
  private falconService: FalconService;

  constructor() {
    this.falconService = new FalconService();
  }

  async setPaymentProof({
    payID,
    identifier,
    createdAt,
    value,
  }: IPayment): Promise<IResponse> {
    try {
      if (!payID || !identifier || !createdAt || !value) {
        return { status: 400, message: 'Bad Request: missing properties' };
      }
      await this.falconService.connect(process.env.PAYMENT_COLLECTION);
      const hasPayment =
        await this.falconService.getPaymentByPaymentIdentifier(payID);

      if (hasPayment) {
        return { status: 409, message: 'Payment has been processed' };
      }

      await this.falconService.createPaymentProof({
        identifier: identifier,
        payID: payID,
        createdAt: createdAt,
        value: value,
        status: 'pending',
      });
      return { status: 200, message: 'Successfully created' };
    } catch (error) {
      return {
        status: 403,
        message: error.message,
      };
    } finally {
      await this.falconService.close();
    }
  }

  getPixCode(): IPixData {
    return PIX_CODE;
  }
}
