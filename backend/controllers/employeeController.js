const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee');



// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
  },
});

const upload = multer({ storage: storage });

// Create Employee
exports.createEmployee = [
  upload.single('image'), // Handle single file upload
  async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
      // Check if employee with the same email already exists
      let employee = await Employee.findOne({ email });
      if (employee) {
        return res.status(400).json({ message: 'Employee already exists' });
      }

      // Create new employee with uploaded image filename
      employee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course: course.split(','), // Convert course string to array if necessary
        image: req.file ? req.file.filename : null, // Save the filename of the uploaded image
      });

      // Save employee to database
      await employee.save();
      res.status(201).json(employee);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error while creating employee' });
    }
  },
];


exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



