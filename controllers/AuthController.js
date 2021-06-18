import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import { v4 as uuid } from 'uuid';

export const getConnect = async (req, res) => {
  if (!req.header('Authorization')) {
    res.status(400).json({ error: 'No authorization header' });
  }

  const auth = req.header('Authorization');
  const base = Buffer.from(auth.slice(6), 'base64');
  const [email, password] = base.toString('utf8').split(':');
  const client = await dbClient.findUser({ email });
  const token = uuid();
  const id = `auth_${token}`;
  const unauthorized = res.status(401).json({ error: 'Unauthorized' });

  if (!client || sha1(password) !== client.password) {
    return (unauthorized);
  }
  await redisClient.set(id, client._id.toString(), 86400);
  res.status(200).json({ token });
};

export const getDisconnect = async (req, res) => {
  const userToken = await redisClient.del(`auth_${req.user.token}`);
  const unauthorized = res.status(401).json({ error: 'Unauthorized' });
  const nothing = res.status(204).json({ error: 'Unauthorized' });
  if (!userToken) {
    return (unauthorized);
  } else {
    redisClient.del(userToken);
    return (nothing);
  }
};
