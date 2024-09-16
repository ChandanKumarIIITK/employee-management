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
  upload.single('image'), // Multer middleware for handling image uploads
  async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;

    try {
      // Get the admin ID from the token (assumed to be decoded and available in req.user)
      const adminId = req.user.id; 

      // Check if an employee with the same email already exists
      let employee = await Employee.findOne({ email });
      if (employee) {
        return res.status(400).json({ message: 'Employee already exists' });
      }

      // Create new employee with the admin's ID
      employee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course: course.split(','), // Convert the course string to an array
        image: req.file ? req.file.filename : null,
        admin: adminId // Assign the admin ID
      });

      await employee.save();
      res.status(201).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while creating employee' });
    }
  }
];


exports.getEmployees = async (req, res) => {
  try {
    // Get the admin ID from the token (assumed to be decoded and available in req.user)
    const adminId = req.user.id;

    // Find employees that belong to the logged-in admin
    const employees = await Employee.find({ admin: adminId });
    
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching employees' });
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



