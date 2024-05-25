import { FalconService } from 'src/Falcon/Falcon.service';
import { IResponse, IUser } from 'src/Falcon/types';

export class CreateUserService {
  private falconService: FalconService;

  constructor() {
    this.falconService = new FalconService();
  }

  async createUser(userData: IUser): Promise<IResponse> {
    try {
      await this.falconService.connect();
      const hasUser = await this.falconService.getUserByEmail(userData.email);
      const hasIdentifier = await this.falconService.getUserByIdentifier(
        userData.identifier,
      );
      if (hasUser || hasIdentifier) {
        return { status: 409, message: 'user already exists' };
      }
      await this.falconService.createUser(userData);
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

  getToken(): string {
    const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ1234567890';
    let token = '';
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * dictionary.length);
      token += dictionary[random];
    }
    return token;
  }
}
