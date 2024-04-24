import Crypto from 'src/Guard/Crypto.service';

export class AuthService {
  auth({
    email,
    password,
    timestamp,
  }: {
    email: string;
    password: string;
    timestamp: number;
  }): string {
    const criptoService = new Crypto();
    if (email && password) {
      const jsonToken = JSON.stringify({
        email: email,
        exp: timestamp + 60 * 1000 * 60,
      });
      const token = criptoService.encrypt(jsonToken);

      return token;
    } else {
      return '';
    }
  }
}
