import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  
  name: { 
    type: String, 
    required: [true, 'Employee name is required'], 
    trim: true, 
    minlength: 2, 
    maxlength: 80 },
  
    email: {
    type: String, 
    required: [true, 'Email is required'], 
    trim: true, 
    lowercase: true,
    unique: true, 
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  jobTitle: { 
    type: String, 
    required: [true, 'Job title is required'], 
    trim: true, 
    maxlength: 80 
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: [true, 'Department is required'] 
  },
  joiningDate: { 
    type: Date, 
    required: [true, 'Joining date is required'] },
  
    isActive: { 
      type: Boolean, 
      default: true 
    }
}, { timestamps: true });

employeeSchema.index({ name: 1 });
employeeSchema.index({ email: 1 });

export default mongoose.model('Employee', employeeSchema);
