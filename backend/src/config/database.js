const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to your .env file.');
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

module.exports = connectDB;
