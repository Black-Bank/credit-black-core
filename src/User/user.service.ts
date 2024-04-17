import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  async registerUser(userBody: UserDTO): Promise<any | undefined> {
    return { id: uuidv4(), ...userBody };
  }
}
