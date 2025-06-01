import { MongoClient } from 'mongodb';
import { rateLimit } from '../backend/src/middleware/rateLimiter.js';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  await client.connect();
  const db = client.db('notesdb'); // replace with your database name
  cachedDb = db;
  return db;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Apply rate limiting
  try {
    await rateLimit(req, res);
  } catch (error) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  const db = await connectToDatabase();
  const collection = db.collection('notes');

  try {
    switch (req.method) {
      case 'GET':
        const notes = await collection.find({}).toArray();
        return res.status(200).json(notes);

      case 'POST':
        const { title, content } = req.body;
        if (!title || !content) {
          return res.status(400).json({ message: 'Title and content are required' });
        }
        const newNote = {
          title,
          content,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const result = await collection.insertOne(newNote);
        return res.status(201).json({ ...newNote, _id: result.insertedId });

      case 'PUT':
        const { id } = req.query;
        const updateData = req.body;
        delete updateData._id;
        await collection.updateOne(
          { _id: id },
          { $set: { ...updateData, updatedAt: new Date() } }
        );
        return res.status(200).json({ message: 'Note updated successfully' });

      case 'DELETE':
        const { id: deleteId } = req.query;
        await collection.deleteOne({ _id: deleteId });
        return res.status(200).json({ message: 'Note deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
} 