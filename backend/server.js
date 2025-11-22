import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { basicAuth } from './middleware/auth.js';
import taskRoutes from './routes/task.js'
import logRoutes from './routes/logs.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Apply basic auth to all API routes
app.use('/api', basicAuth);

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/logs', logRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});