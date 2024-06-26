import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { IResponse, IUser } from './types';

export class FalconService {
  private client: MongoClient;
  private db: Db;
  private userCollection: Collection<any>; // Defina o tipo apropriado para os documentos de usuário

  constructor() {
    this.client = new MongoClient(process.env.MONGO_FALCON);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.MONGO_DATABASE_NAME);
      this.userCollection = this.db.collection(
        process.env.USER_CREDENTIALS_COLLECTION,
      );
    } catch (error) {
      console.log('Err on connecting:', error.message);
    }
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
  async close(): Promise<void> {
    await this.client.close();
  }
}
