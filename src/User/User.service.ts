import { FalconService } from 'src/Falcon/Falcon.service';

export class UserService {
  private falconService: FalconService;

  constructor() {
    this.falconService = new FalconService();
  }

  async getUser(userIdentifier: string) {
    try {
      await this.falconService.connect();
      const user = await this.falconService.getUserByIdentifier(userIdentifier);
      return {
        email: user.email,
        name: user.name,
        cellphone: user.cellphone,
        amount: user.amount,
        createdAt: user.createdAt,
        identifier: user.identifier,
        loanValue: user.loanValue,
        investedValue: user.investedValue,
      };
    } catch (error) {
      return { code: 500, message: 'Failed to get user' };
    } finally {
      await this.falconService.close();
    }
  }
}
