const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user for testing purposes
const user = {
  username: 'admin',
  password: '$2a$10$z7v6GoT9bIu7k9zKM2He..xpsCzQFrQnBeRmbyWdaOesMaFCUtN/6' // Hashed password: 'password'
};

// Login and generate JWT token
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Simple user verification
  if (username !== user.username) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Create JWT payload
  const payload = {
    user: {
      id: 1, // Static ID for testing, use database-generated ID in real-world scenario
      username: user.username
    }
  };

  // Generate token
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
};
