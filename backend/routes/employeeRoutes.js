const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware, createEmployee);
router.get('/',authMiddleware, getEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
