import { Client, GatewayIntentBits } from 'discord.js';
import { FalconService } from 'src/Falcon/Falcon.service';
import { IPayment, IResponse } from 'src/Falcon/types';
import { IPixData, PIX_CODE } from './base64QRCode';

// Configurações do Bot do Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

export class PixService {
  private falconService: FalconService;
  private DISCORD_TOKEN: string;
  private DISCORD_CHANNEL_ID: string;

  constructor() {
    this.falconService = new FalconService();
    this.DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN;
    this.DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
    client.login(this.DISCORD_TOKEN);
  }

  async setPaymentProof({
    payID,
    identifier,
    createdAt,
    value,
    base64,
  }: IPayment): Promise<IResponse> {
    try {
      if (!payID || !identifier || !createdAt || !value) {
        return { status: 400, message: 'Bad Request: missing properties' };
      }

      await this.falconService.connect(process.env.PAYMENT_COLLECTION);

      const hasPayment =
        await this.falconService.getPaymentByPaymentIdentifier(payID);

      if (hasPayment) {
        return { status: 409, message: 'Payment has been processed' };
      }

      await this.sendImageToDiscord(
        base64,
        `Solicitação de depósito no valor de: U$ ${value}, documento:${identifier}, identificador de pagamento ${payID}, criada em: ${createdAt}`,
      );

      await this.falconService.createPaymentProof({
        identifier: identifier,
        payID: payID,
        createdAt: createdAt,
        value: value,
        status: 'pending',
      });

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

  async getPaymentProof({
    identifier,
    page,
  }: {
    identifier: string;
    page: number;
  }) {
    try {
      await this.falconService.connect(process.env.PAYMENT_COLLECTION);

w      const [payments, totalDocuments] = await Promise.all([
        this.falconService.getPaymentByIdentifier({ identifier, page }),
        this.falconService.getCountDocumentsByIdentifier(identifier),
      ]);

      return { payments: payments, total: totalDocuments };
    } catch (error) {
      return {
        status: 403,
        message: error.message,
      };
    } finally {
      await this.falconService.close();
    }
  }
  getPixCode(): IPixData {
    return PIX_CODE;
  }

  private async sendImageToDiscord(base64Image: string, description: string) {
    const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const channel = await client.channels.fetch(this.DISCORD_CHANNEL_ID);
    if (channel.isTextBased()) {
      await channel.send({
        content: description,
        files: [{ attachment: buffer, name: 'image.png' }],
      });
    }
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
