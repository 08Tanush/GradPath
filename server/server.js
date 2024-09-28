// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/GradPath', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));


// const corsOptions = {
//   origin: 'http://127.0.0.1:5501', // Allow this specific origin
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files
const {activityController} = require('./routes/ActivityController');
app.use('/uploadActivity', activityController);

const {User} = require('./models/users');
// JWT Secret Key (make sure this is stored securely in production)
const JWT_SECRET = 'your-secret-key'; // Replace with an environment variable in production
const {Activity} = require('./models/Activities');
const {Category} = require('./models/categories');
const {CategoryField} = require('./models/categoryFields');

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// POST: Create a new activity
app.post('/activities', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const result = await newActivity.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Fetch all activities
app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch an activity by ID
app.get('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findOne({ id: req.params.id });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an activity by ID
app.put('/activities/:id', async (req, res) => {
  try {
    const updatedActivity = await Activity.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete an activity by ID
app.delete('/activities/:id', async (req, res) => {
  try {
    const deletedActivity = await Activity.findOneAndDelete({ id: req.params.id });
    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hash the password before saving the user
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// POST: Register a new user (Signup)
app.post('/signup', async (req, res) => {
  try {
      const { user_name, email, password, role } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Determine the role based on the email
      let userRole;
      if (/^\d/.test(email)) { // Check if the email starts with a number
          userRole = 'student';
      } else {
          const roleCheck = await User.findOne({ role: { $in: ['faculty', 'admin'] } });
          if (roleCheck) {
              return res.status(400).json({ message: 'Faculty and Admin cannot be created after the first one.' });
          }
          userRole = 'faculty'; // Default role if not a student
      }

      // Hash the password before saving
      const pass_hash = await hashPassword(password);

      // Create a new user
      const newUser = new User({
          user_name,
          email,
          pass_hash,
          role: userRole
      });

      // Save the user to the database
      const savedUser = await newUser.save();
      res.status(201).json({ message: 'User registered successfully', user: savedUser });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// POST: Login (Authenticate the user)
app.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body)
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the stored hash
    // const isMatch = user.pass_hash==password;
    const isMatch = await bcrypt.compare(password, user.pass_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// // Protected route (example, requires JWT token)
// app.get('/dashboard', async (req, res) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(403).json({ message: 'Token is required' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.status(200).json({ message: 'Welcome to the dashboard', user: decoded });
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// Categories route - this will handle fetching categories dynamically
app.get('/categories', async (req, res) => {
  try {
      const categories = await Category.find(); // Fetch all categories
      res.json(categories);  // Send categories as JSON response
  } catch (error) {
      console.error('Error fetching categories:', error); // Log the error
      res.status(500).json({ error: 'Failed to fetch categories' }); // Send 500 response with error message
  }
});


// Endpoint to get fields for a specific category
app.get('/categories/:categoryId/fields', async (req, res) => {
  const categoryId = req.params.categoryId;
  console.log('Received categoryId:', categoryId); // Log categoryId

  try {
      const fields = await CategoryField.find({ category_id: categoryId });
      console.log('Fields found:', fields); // Log the fetched fields
      res.json(fields);
  } catch (error) {
      console.error('Error fetching category fields:', error);
      res.status(500).json({ error: 'Failed to fetch category fields' });
  }
});


// Other routes (if you have more routes, you can define them here)
// For example, if you're handling the form submission for adding an activity:

app.post('/uploadActivity', async (req, res) => {
  // Handle the form submission, save the activity data to MongoDB
  try {
      const { title, desc, category, startDateTime, endDateTime, location } = req.body;
      // You can now save this data into an Activity model or handle the upload as needed.
      // Example (assuming an Activity model):
      // const activity = new Activity({
      //     title, desc, category, startDateTime, endDateTime, location
      // });
      // await activity.save();
      console.log('Activity Uploaded:', req.body);
      res.send('Activity Uploaded Successfully');
  } catch (error) {
      res.status(500).send('Failed to upload activity');
  }
});
