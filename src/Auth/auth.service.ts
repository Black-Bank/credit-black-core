import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const comparePasswordHashed = bcrypt.compareSync(pass, user.password);

    if (user && comparePasswordHashed) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async auth({ email, password }: { email: string; password: string }) {
    const user = await this.validateUser(email, password);
    return {
      access_token: this.jwtService.sign(user, {
        secret: jwtConstants.secret,
        expiresIn: '24h',
      }),
    };
  }
}
