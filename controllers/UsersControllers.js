import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

export const postNew = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  let user = await dbClient.findUser({ email });

  if (!email) {
    res.status(400).json({ error: 'Missing email' });
  }
  if (!password) {
    res.status(400).json({ error: 'Missing password' });
  }

  if (user) {
    res.status(400).json({ error: 'Already exist' });
  } else {
    user = await dbClient.createUser(email, sha1(password));
    res.status(201).json(user);
  }
};

export const getMe = async (req, res) => {
  const user = await dbClient.findUser({ _id: ObjectId(req.user.id) });
  res.status(200).json({ email: user.email, id: user._id });
};
