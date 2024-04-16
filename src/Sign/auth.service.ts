import { UnauthorizedException } from '@nestjs/common';

export class AuthService {
  auth({ email, password }: { email: string; password: string }): {
    token: string;
  } {
    if (email && password) {
      const token =
        '2ef7bde608ce5404e97d5f042f95f89f1c232871df1eceb79025664b9fa9f0d2';
      return { token };
    } else {
      throw new UnauthorizedException();
    }
  }
}
