require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4000;
const API_PREFIX = '/api';

app.use(cors());
app.use(express.json());

app.get(`${API_PREFIX}/health`, (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
