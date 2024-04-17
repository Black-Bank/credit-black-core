import { PrismaService } from 'src/database/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async registerUser(userBody: UserDTO) {
    const userAlreadyRegistered = await this.prisma.user.findFirst({
      where: {
        email: userBody.email,
      },
    });

    if (userAlreadyRegistered) {
      throw new UnauthorizedException();
    }

    const userCreated = await this.prisma.user.create({
      data: {
        ...userBody,
        password: bcrypt.hashSync(userBody.password, 10),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return userCreated;
  }
}
