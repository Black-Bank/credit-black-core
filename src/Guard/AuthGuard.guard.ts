import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import Crypto from './Crypto.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private crypto: Crypto) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    //const crypto = this.crypto;
    //const isProd = Boolean(process.env.NODE_ENV === 'prod');
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new ForbiddenException('No authorization header');
    } else {
      const isAuthenticated = authHeader === 'hmg-auth-01';
      return isAuthenticated;
    }
  }
}
