import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";

export async function Signup(req, res) {
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