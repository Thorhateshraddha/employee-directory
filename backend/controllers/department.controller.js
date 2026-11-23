
import Department from '../models/Department.js';

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({})
      .select('_id name description')
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });

  } catch (error) {
    console.error('Department API Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch departments',
      error: error.message
    });
  }
};
