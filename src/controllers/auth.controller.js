import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  
  try {
    // Validates if the email already exists in the database
    const emailExists = await db.collection('users').findOne({ email });
    if (emailExists) return res.status(409).send('Email already exists');
    
    await db.collection('users').insertOne({ name, email, hash });
    res.status(201).send('User successfully signed up')
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    // Validates if the email exists in the database
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(404).send('This user does not exist');

    // Validates if the password matches the password in the database
    const correctPass = bcrypt.compareSync(password, user.hash);
    if(!correctPass) return res.status(401).send('Invalid password');

    return res.status(200).send('logged');
  } catch (err) {
    res.status(500).send(err.message);
  }
};  