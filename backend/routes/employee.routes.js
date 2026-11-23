import express from 'express';
import {
  listEmployees, createEmployee, getEmployee, updateEmployee,
  updateEmployeeStatus, deleteEmployee
} from '../controllers/employee.controller.js';

const router = express.Router();

router.route('/').get(listEmployees).post(createEmployee);
router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);
router.patch('/:id/status', updateEmployeeStatus);

export default router;
