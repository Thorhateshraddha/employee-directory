import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import Department from '../models/Department.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const allowedFields = ['name', 'email', 'jobTitle', 'department', 'joiningDate', 'isActive'];

function validateEmployeeBody(body, partial = false) {
  const data = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (!partial) {
    for (const field of ['name', 'email', 'jobTitle', 'department', 'joiningDate']) {
      if (data[field] === undefined || data[field] === '') {
        const error = new Error(`${field} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
  }
  if (data.name !== undefined && String(data.name).trim().length < 2) {
    const error = new Error('Name must contain at least 2 characters'); error.statusCode = 400; throw error;
  }
  if (data.email !== undefined) {
    data.email = String(data.email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      const error = new Error('Please enter a valid email address'); error.statusCode = 400; throw error;
    }
  }
  if (data.department !== undefined && !mongoose.isValidObjectId(data.department)) {
    const error = new Error('Please select a valid department'); error.statusCode = 400; throw error;
  }
  if (data.joiningDate !== undefined && Number.isNaN(new Date(data.joiningDate).getTime())) {
    const error = new Error('Please enter a valid joining date'); error.statusCode = 400; throw error;
  }
  if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
    const error = new Error('Active status must be true or false'); error.statusCode = 400; throw error;
  }
  return data;
}

export const listEmployees = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const filter = {};

  if (req.query.search?.trim()) {
    const search = req.query.search.trim();
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  if (req.query.department) {
    if (!mongoose.isValidObjectId(req.query.department)) {
      return res.status(400).json({ success: false, message: 'Invalid department filter' });
    }
    filter.department = req.query.department;
  }
  if (req.query.status === 'active') filter.isActive = true;
  if (req.query.status === 'inactive') filter.isActive = false;

  const [employees, total] = await Promise.all([
    Employee.find(filter).populate('department', 'name').sort({ createdAt: -1 })
      .skip((page - 1) * limit).limit(limit),
    Employee.countDocuments(filter)
  ]);

  res.json({
    success: true, data: employees,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  });
});

export const createEmployee = asyncHandler(async (req, res) => {
  const data = validateEmployeeBody(req.body);
  const department = await Department.findById(data.department);
  if (!department) return res.status(400).json({ success: false, message: 'Selected department does not exist' });
  const employee = await Employee.create(data);
  await employee.populate('department', 'name');
  res.status(201).json({ success: true, message: 'Employee created successfully', data: employee });
});

export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate('department', 'name description');
  if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
  res.json({ success: true, data: employee });
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const data = validateEmployeeBody(req.body, true);
  if (data.department) {
    const department = await Department.findById(data.department);
    if (!department) return res.status(400).json({ success: false, message: 'Selected department does not exist' });
  }
  const employee = await Employee.findByIdAndUpdate(req.params.id, data, {
    new: true, runValidators: true
  }).populate('department', 'name');
  if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
  res.json({ success: true, message: 'Employee updated successfully', data: employee });
});

export const updateEmployeeStatus = asyncHandler(async (req, res) => {
  if (typeof req.body.isActive !== 'boolean') {
    return res.status(400).json({ success: false, message: 'isActive must be true or false' });
  }
  const employee = await Employee.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, {
    new: true, runValidators: true
  }).populate('department', 'name');
  if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
  res.json({ success: true, message: `Employee ${employee.isActive ? 'activated' : 'deactivated'} successfully`, data: employee });
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
  res.json({ success: true, message: 'Employee permanently deleted' });
});
