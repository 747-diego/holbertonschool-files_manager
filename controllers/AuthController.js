import sha1 from 'sha1';
import { v4 as uuid } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export const getConnect = async (req, res) => {
  let auth = req.header('Authorization');
  if (!auth) {
    res.status(400).json({ error: 'Credentials Invalid' });
  }

  const space = Buffer.from(auth, 'base64');
  const [email] = space.toString('utf8').split(':');
  auth = auth.slice(6);
  const userEmail = await dbClient.findUser({ email });
  const usersID = uuid();
  const usersPassword = `auth_${usersID}`;
  await redisClient.set(usersPassword, userEmail._id.toString());
  res.status(200).json({ usersID });
};

export const getDisconnect = async (req, res) => {
  await redisClient.del(`auth_${req.user.token}`);
  res.status(204).send('');
};
