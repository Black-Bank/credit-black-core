import { FalconService } from 'src/Falcon/Falcon.service';
import { IAuthError } from 'src/Falcon/types';
import bcrypt from 'bcrypt';
import Crypto from 'src/Guard/Crypto.service';

export class AuthService {
  async auth({
    email,
    password,
    timestamp,
  }: {
    email: string;
    password: string;
    timestamp: number;
  }): Promise<string | IAuthError> {
    const criptoService = new Crypto();
    const falconService = new FalconService();
    console.log('init', await bcrypt.hash('init', 10));

    if (email && password) {
      console.log('inside');
      try {
        await falconService.connect();
        const user = await falconService.getUserByEmail(email);
        console.log('user', user);
        if (user) {
          console.log('here');

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            const jsonToken = JSON.stringify({
              email: email,
              exp: timestamp + 60 * 1000 * 60,
            });

            const token = criptoService.encrypt(jsonToken);
            return token;
          } else {
            return { status: 401, message: 'Invalid Credentials' };
          }
        } else {
          return { status: 401, message: 'Invalid Credentials' };
        }
      } catch (error) {
        return { status: 500, message: 'Server Error' };
      } finally {
        await falconService.close();
      }
    } else {
      return { status: 401, message: 'Credentials not provided' };
    }
  }
}
