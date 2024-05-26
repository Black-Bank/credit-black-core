import { FalconService } from 'src/Falcon/Falcon.service';
import { IAuthError, IAuthResponse } from 'src/Falcon/types';
import * as bcrypt from 'bcrypt';
import Crypto from 'src/Guard/Crypto.service';

export class AuthService {
  async auth({
    identifier,
    password,
    timestamp,
  }: {
    identifier: string;
    password: string;
    timestamp: number;
  }): Promise<IAuthResponse | IAuthError> {
    const criptoService = new Crypto();
    const falconService = new FalconService();

    if (identifier && password) {
      try {
        await falconService.connect();
        const user = await falconService.getUserByIdentifier(identifier);

        if (user) {
          const passwordMatch = bcrypt.compareSync(password, user.password);

          if (passwordMatch) {
            const jsonToken = JSON.stringify({
              email: identifier,
              exp: timestamp + 60 * 1000 * 60,
            });

            const token = criptoService.encrypt(jsonToken);
            return { status: 200, token: token };
          } else {
            return { status: 401, message: 'Invalid Credentials' };
          }
        } else {
          return { status: 401, message: 'Invalid Credentials' };
        }
      } catch (error) {
        return {
          status: 403,
          message: error.message,
        };
      } finally {
        await falconService.close();
      }
    } else {
      return { status: 401, message: 'Credentials not provided' };
    }
  }
}
