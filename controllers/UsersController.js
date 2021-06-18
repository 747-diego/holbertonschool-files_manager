import sha1 from 'sha1';
import dbClient from '../utils/db';
import { ObjectId } from 'mongodb';

export const postNew = async (req, res) => {
  const { email, password } = req.body;
  let user = await dbClient.findUser({ email });
  if (!email)res.status(400).json({ error: 'Missing email' });
  if (!password)res.status(400).json({ error: 'Missing password' });
  if (user)res.status(400).json({ error: 'Already exist' });
  user = await dbClient.createUser(email, sha1(password));
  res.status(201).json(user);
};

export const getMe = async (req, res) => {
  const object = { _id: ObjectId(req.user.id) };
  const userToken = await dbClient.findUser({ object });
  const unauthorized = res.status(401).json({ error: 'Unauthorized' });
  const email = userToken.email;
  const token = userToken._id;
  if (!userToken) {
    return (unauthorized);
  } else {
    res.status(200).json({ email: email, id: token });
  }
};
