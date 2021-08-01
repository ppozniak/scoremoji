import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
  const dbUri = process.env.MONGODB_URI;
  if (!dbUri) {
    console.log('Error: Missing database connection URI!');
    throw new Error('Error connecting with database');
  }

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting with database');
  }
};
