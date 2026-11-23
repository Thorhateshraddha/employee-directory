
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import departmentRoutes from './routes/department.routes.js';
import employeeRoutes from './routes/employee.routes.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
