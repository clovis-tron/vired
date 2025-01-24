const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Schemas and Models
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'parent', 'teacher', 'corporate'] },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: false },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Routes
// Admin Signup
app.post('/api/admin/signup', async (req, res) => {
  const { username, password, secretCode } = req.body;

  if (secretCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(403).json({ error: 'Invalid secret code.' });
  }

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return res.status(409).json({ error: 'Admin already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();

  res.status(201).json({ message: 'Admin registered successfully.' });
});

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(404).json({ error: 'Admin not found.' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful.', token });
});

// Middleware to Authenticate Admin
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

// Subscription Routes
app.get('/api/check-subscription', authenticateAdmin, async (req, res) => {
  try {
    const userId = req.admin.id;
    const subscription = await Subscription.findOne({ userId });

    if (!subscription || !subscription.isActive) {
      return res.status(404).json({ message: 'No active subscription found.' });
    }

    res.status(200).json({ isActive: subscription.isActive });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check subscription status.' });
  }
});

app.post('/api/subscribe', authenticateAdmin, async (req, res) => {
  const { userId, paymentMethod } = req.body;

  try {
    if (!paymentMethod) {
      return res.status(400).json({ error: 'Invalid payment method.' });
    }

    const subscription = new Subscription({
      userId,
      isActive: true,
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });

    await subscription.save();

    res.status(200).json({ message: 'Subscription successful!', subscription });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create subscription.' });
  }
});

// User Login
app.post('/api/users/login', async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });
  if (!user) {
    return res.status(400).json({ error: 'User not found.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, message: 'Login successful!' });
});

// Video CRUD Routes
app.use('/api/videos', authenticateAdmin, videoRoutes);

// Video Upload
app.post('/api/upload', authenticateAdmin, upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// User Routes
app.use('/api/users', userRoutes);

// Static File Serving
app.use('/uploads', express.static('uploads'));

// Ensure the 'uploads' folder exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Start Server
const PORT = process.env.PORT || 4999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
