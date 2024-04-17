import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import Crypto from 'src/Guard/Crypto.service';
import { AuthDTO, TokenDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private crypto: Crypto,
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

  async auth({ token }: TokenDTO) {
    const decoded = await this.decrypt(token);

    if (!decoded) {
      throw new UnauthorizedException();
    }

    const user = JSON.parse(decoded);

    const { id, email, name } = await this.validateUser(
      user.email,
      user.password,
    );

    const tokenJwt = this.crypto.encrypt(
      this.jwtService.sign(
        { id, email, name },
        {
          secret: jwtConstants.secret,
          expiresIn: '1h',
        },
      ),
    );
    return {
      access_token: tokenJwt,
    };
  }

  async encrypt({ email, password }: AuthDTO) {
    return {
      token: this.crypto.encrypt(JSON.stringify({ email, password })),
    };
  }

  async decrypt(token: string): Promise<any | boolean> {
    const user = this.crypto.decrypt(token);
    return user === null ? false : user;
  }
}
