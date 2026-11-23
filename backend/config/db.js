
import dns from 'node:dns';
import mongoose from 'mongoose';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from .env');
    }

    const connection = await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000
      }
    );

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

    return connection;

  } catch (error) {
    console.error(
      'MongoDB connection failed:',
      error.message
    );

    throw error;
  }
};

export default connectDB;