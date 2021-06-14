import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.clientGet = promisify(this.client.get).bind(this.client);
    this.clientSet = promisify(this.client.set).bind(this.client);
    this.clientDel = promisify(this.client.del).bind(this.client);
  }

  // Methods

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const gettingKey = await this.getter(key);
    return (gettingKey);
  }

  async set(key, value, duration) {
    const settingKey = await this.clientSet(key, value, 'EX', duration);
    return (settingKey);
  }

  async del(key) {
    const deletingKey = await this.clientDel(key);
    return (deletingKey);
  }
}
const redisClient = new RedisClient();
export default redisClient;
