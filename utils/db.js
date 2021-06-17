import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.db = null;
    const databaseHost = process.env.DB_HOST || 'localhost';
    const databasePort = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const mongoLink = `mongodb://${databaseHost}:${databasePort}/`;

    MongoClient.connect(mongoLink, { useUnifiedTopology: true }, (error, client) => {
      if (error) console.log(error);
      this.db = client.db(database);
      this.db.createCollection('users');
      this.db.createCollection('files');
    });
  }

  isAlive() {
    const check = !!this.db;
    return (check);
  }

  async nbUsers() {
    const userDocuments = await this.db.collection('users').countDocuments();
    return (userDocuments);
  }

  async nbFiles() {
    const userFiles = await this.db.collection('files').countDocuments();
    return (userFiles);
  }

  async findUser(query) {
    const user = await this.db.collection('users').findOne(query);
    return (user);
  }

  async createUser(email, password) {
    await this.db.collection('users').insertOne({ email, password });

    const newUser = await this.db.collection('users').findOne({ email });
    return ({ id: newUser._id, email: newUser.email });
  }

  async findFile(query) {
    const file = await this.db.collection('files').findOne(query);
    return (file);
  }

  async uploadFile(data) {
    await this.db.collection('files').insertOne(data);
    const newFile = await this.db.collection('files').findOne(data);
    return (newFile);
  }
}
const dbClient = new DBClient();
export default dbClient;
