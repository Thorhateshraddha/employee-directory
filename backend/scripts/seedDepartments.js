import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Department from '../models/Department.js';

const departments = [
  ['Engineering', 'Software development and engineering'],
  ['Human Resources', 'People operations and recruitment'],
  ['Sales', 'Sales and customer relationships'],
  ['Marketing', 'Marketing and communications'],
  ['Finance', 'Accounting and financial operations'],
  ['Operations', 'Business operations']
];

try {
  await connectDB();
  for (const [name, description] of departments) {
    await Department.updateOne({ name }, { $setOnInsert: { name, description } }, { upsert: true });
  }
  console.log('Departments seeded successfully');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
