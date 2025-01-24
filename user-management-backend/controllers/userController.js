const User = require('../models/User');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role, age } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Ensure age is provided for students
  if (role === 'student' && !age) {
    return res.status(400).json({ message: 'Age is required for students' });
  }

  // Validate role
  const validRoles = ['student', 'parent', 'teacher', 'corporate'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      ...(role === 'student' && { age }), // Add age only for students
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser };
