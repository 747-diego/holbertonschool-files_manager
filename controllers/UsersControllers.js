import sha1 from 'sha1';
import dbClient from '../utils/db';

export const postNew = async (req, res) => {
  const { email, password } = req.body;

  if (!email)res.status(400).json({ error: 'Missing email' });
  if (!password)res.status(400).json({ error: 'Missing password' });

  let user = await dbClient.findUser({ email });
  if (user)res.status(400).json({ error: 'Already exist' });

  user = await dbClient.createUser(email, sha1(password));
  res.status(201).json(user);
};
