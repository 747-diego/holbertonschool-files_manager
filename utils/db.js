import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.db = null;
    const databaseHost = process.env.DB_HOST || 'localhost';
    const databasePort = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const mongoLink = `mongodb://${databaseHost}:${databasePort}`;

    MongoClient.connect(mongoLink, { useUnifiedTopology: true }, (error, client) => {
      if (error) console.log(error);
      this.db = client.db(database);
      this.db.createCollection('users');
      this.db.createCollection('files');
    });
  }

  isAlive() {
    if (this.client.isConnected()) {
      return (true);
    }
    else {
      return (false);
    }
  }

  async nbUsers() {
    const countUsers = await this.db.collection('users').countDocuments();
    return (countUsers);
  }

  async nbFiles() {
    const countFiles = await this.db.collection('files').countDocuments();
    return (countFiles);
  }

  async findUser(query) {
    return (await this.db.collection('users').findOne(query));
  }
}
const client = new DBClient();
export default client;
