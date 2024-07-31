import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { IPayment, IResponse, IUser } from './types';

export class FalconService {
  private client: MongoClient;
  private db: Db;
  private userCollection: Collection<any>; // Defina o tipo apropriado para os documentos de usuário

  constructor() {
    this.client = new MongoClient(process.env.MONGO_FALCON);
  }

  async connect(collection: string): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.MONGO_DATABASE_NAME);
      this.userCollection = this.db.collection(collection);
    } catch (error) {
      console.log('Err on connecting:', error.message);
    }
  }

  async getPaymentByIdentifier({
    identifier,
    page,
  }: {
    identifier: string;
    page: number;
  }): Promise<IPayment[]> {
    const pageLimit = 10;
    const payment = await this.userCollection
      .find({
        identifier: identifier,
      })
      .skip(Math.max(0, (page - 1) * pageLimit))
      .limit(pageLimit)
      .toArray();
    return payment;
  }

  async getPaymentByPaymentIdentifier(payID: string): Promise<IPayment> {
    const payment = await this.userCollection.findOne({
      payID: payID,
    });
    return payment;
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await this.userCollection.findOne({
      _id: new ObjectId(userId),
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userCollection.findOne({ email });
    return user;
  }

  async getUserByIdentifier(identifier: string): Promise<IUser> {
    const user = await this.userCollection.findOne({ identifier });

    return user;
  }

  async createUser(newUser: IUser): Promise<IResponse> {
    try {
      await this.userCollection.insertOne(newUser);
      return { status: 200, message: 'User created successfully' };
    } catch (error) {
      return { status: 403, message: error.message };
    }
  }
  async createPaymentProof(newPayment: IPayment): Promise<IResponse> {
    try {
      await this.userCollection.insertOne(newPayment);
      return { status: 200, message: 'Payment created successfully' };
    } catch (error) {
      return { status: 403, message: error.message };
    }
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
