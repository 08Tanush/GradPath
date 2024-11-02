const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/GradPath', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const { User } = require('./models/users');
const { Activity } = require('./models/Activities');
const { ActivityField } = require('./models/activity_fields');
const { Category } = require('./models/categories');
const { CategoryField } = require('./models/categoryFields');
const {FacultyAssignment} = require('./models/facultyAssignments')
const { Profile } = require('./models/profiles');

// JWT Secret Key (store this securely in production)
const JWT_SECRET = process.env.JWT_SECRET;

// Global variable for tracking the current user session
let currUser = null;

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Utility function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Middleware to check if the user is logged in by verifying the JWT token
const isLoggedIn = async (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by decoded userId
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Attach user information to req for further usage in routes
    req.user = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Function to get profile ID from user ID
async function getProfileIdFromUserId(userId) {
  try {
      // Find the profile with the specified user_id
      const profile = await Profile.findOne({ user_id: userId }).select('_id');
      
      // Check if profile was found
      if (profile) {
          return profile._id; // Return the profile's ObjectId (profile_id)
      } else {
          throw new Error('Profile not found for the given user_id');
      }
  } catch (error) {
      console.error("Error retrieving profile ID:", error.message);
      throw error;
  }
}

// POST: Register a new user (Signup)
// POST: Register a new user (Signup)
app.post('/signup', async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Determine the role based on email pattern
    let userRole;
    if (/^\d{3}[a-z]+[0-9]{4}@dbit\.in$/.test(email)) {
      userRole = 'student';
    } else {
      const roleCheck = await User.findOne({ role: { $in: ['faculty', 'admin'] } });
      if (roleCheck) {
        return res.status(400).json({ message: 'Faculty/Admin already exists' });
      }
      userRole = 'faculty';
    }

    // Hash the password before saving
    const pass_hash = await hashPassword(password);

    // Create a new user
    const newUser = new User({ user_name, email, pass_hash, role: 'student' });
    const savedUser = await newUser.save();

    // Create a profile for the new user
    const profileData = {
      user_id: savedUser._id,
      name: user_name,
      email: email,
      start_year: "Unknown",
      class: "Not specified",             // Placeholder
      branch: "Not specified",            // Placeholder
      current_position: "Not specified",  // Placeholder
      since_when: null,                   // Placeholder
      about: "No bio provided",           // Placeholder
      skills: [],                         // Default empty array
      profile_picture: "anonymous.png",   // Default profile picture
      contact_number: "Not specified",    // Placeholder
      github: "Not specified",            // Placeholder
      linkedin: "Not specified",          // Placeholder
      website: "Not specified",           // Placeholder
      dob: null,                          // Placeholder for date of birth
      current_year: "Not specified",      // Placeholder for current academic year
      position: userRole === 'faculty' ? "Faculty" : "Student" // Position defaults based on role
    };

    // Save the profile in the database
    const newProfile = new Profile(profileData);
    await newProfile.save();

    // Respond with a success message and user info
    res.status(201).json({
      message: 'User registered successfully, and profile created',
      user: savedUser,
      profile: newProfile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Login (Authenticate the user)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.pass_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Create JWT token using the secret from .env
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get the count of activities for each category based on profile_id
app.get('/activityCounts/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const activityCounts = await Activity.aggregate([
      { $match: { profile_id: userId.toString() } }, // Filter by user ID
      { $group: { _id: "$category_id", count: { $sum: 1 } } } // Group by category and count activities
    ]);

    res.status(200).json(activityCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching activity counts" });
  }
});

// GET: User data (requires user to be logged in)
app.get('/users/:userId', isLoggedIn, async (req, res) => {
  const userId = req.params.userId;

  // Ensure that both IDs are compared as strings
  if (req.user.userId.toString() !== userId.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      role: user.role,
      email: user.email,
      createdAt: user.created_at,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// GET: Fetch current logged-in user details
app.get('/users/me', isLoggedIn, (req, res) => {
  res.json({ email: currUser.email, role: currUser.role });
});

// POST: Logout (Clear currUser)
app.post('/logout', (req, res) => {
  currUser = null;
  res.json({ message: 'Logged out successfully' });
});

// POST: Create a new activity (only faculty can create)
app.post('/activities', isLoggedIn, async (req, res) => {
  try {
    if (currUser.role !== 'faculty') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const newActivity = new Activity(req.body);
    const result = await newActivity.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Fetch all activities (accessible to everyone)
app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an activity by ID (only faculty can update)
app.put('/activities/:id', isLoggedIn, async (req, res) => {
  try {
    if (currUser.role !== 'faculty') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedActivity) return res.status(404).json({ message: 'Activity not found' });

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete an activity by ID (only faculty can delete)
app.delete('/activities/:id', isLoggedIn, async (req, res) => {
  try {
    if (currUser.role !== 'faculty') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ message: 'Activity not found' });

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch categories (accessible to everyone)
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// GET: Fetch fields for a specific category (accessible to everyone)
app.get('/categories/:categoryId/fields', async (req, res) => {
  try {
    const fields = await CategoryField.find({ category_id: req.params.categoryId });
    res.json(fields);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category fields' });
  }
});

// POST endpoint for adding/updating user profiles
app.post('/api/profile', isLoggedIn, async (req, res) => {
  const { name, skills, about } = req.body;
  try {
    const newProfile = new Profile({
      user_id: currUser.userId,
      name,
      email: currUser.email,
      skills,
      about,
      created_at: new Date(),
      updated_at: new Date()
    });

    await newProfile.save();
    res.status(201).json({ message: 'Profile created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile. Please try again.' });
  }
});

// Route to fetch the profile for the logged-in user
app.get('/api/profile/:userId', isLoggedIn, async (req, res) => {
  const userId = req.params.userId;
  console.log(userId.toString())

  // Check if the logged-in user's ID matches the requested user ID
  if (req.user.userId.toString() !== userId.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    // Find the user profile using the userId
    const userProfile = await Profile.findOne({ user_id: userId.toString() });
    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Return the user's profile data
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
});

// Route to update user profile
app.put('/api/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      // Update the profile
      const updatedProfile = await Profile.findOneAndUpdate(
          { user_id: userId }, // Find the profile by user_id
          {
              ...req.body, // The updated data from the request
              updated_at: Date.now(), // Update the timestamp
          },
          { new: true, runValidators: true } // Options: return the updated document and run validators
      );

      if (!updatedProfile) {
          return res.status(404).json({ message: 'Profile not found.' });
      }

      res.status(200).json(updatedProfile);
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

const multer = require('multer');

// Set up storage location and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  }
});

// Initialize multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only PDFs and images are allowed'));
    }
    cb(null, true);
  }
});

app.post('/activities/create', upload.array('documents', 10), async (req, res) => {
  try {
    // Get token from headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is passed as "Bearer <token>"
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode token
    const userId = decodedToken.userId; // Extract userId from token

    // Fetch the profile using userId
    const userProfile = await Profile.findOne({ user_id: userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found for the user' });
    }

    // Get the profile ID from the profile
    // const profileId = userProfile._id;
    const profileId = userId;

    // Destructure incoming request body
    const { category, startDateTime, endDateTime, title, desc, visibility, location } = req.body;

    console.log(req.body)

    // Ensure that start_dateTime and end_dateTime are in a valid format
    const parsedStartDateTime = new Date(startDateTime);
    const parsedEndDateTime = new Date(endDateTime);

    // Check if dates are valid
    if (isNaN(parsedStartDateTime) || isNaN(parsedEndDateTime)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Save the activity
    const newActivity = new Activity({
      profile_id: String(profileId), // Use the profile ID obtained from userId
      category_id: String(category), // Ensure category_id is a string
      start_dateTime: parsedStartDateTime, // Set parsed start date
      end_dateTime: parsedEndDateTime, // Set parsed end date
      title,
      description: desc,
      visibility: visibility || "public", // Default to public if visibility is not provided
      location,
      created_at: new Date(),
      updated_at: new Date()
    });

    const savedActivity = await newActivity.save();

    // Save activity fields
    const fields = JSON.parse(req.body.fields); // Parse the fields from the request body
    const activityFields = fields.map(field => ({
      activity_id: String(savedActivity._id), // Ensure activity_id is a string
      field_id: String(field.field_id), // Ensure field_id is a string
      field_value: field.field_value
    }));

    await ActivityField.insertMany(activityFields);

    // Respond with a success message and activity data
    res.status(201).json({ message: 'Activity created successfully', activity: savedActivity });

  } catch (error) {
    console.error('Error in activity creation:', error);
    res.status(500).json({ message: 'Failed to create activity', error: error.message });
  }
});

// GET profile by student ID
app.get('/profile/:studentId', async (req, res) => {
  const studentId = req.params.studentId; // Extract studentId from URL parameter

  try {
      // Fetch the profile by `user_id` matching `studentId`
      const profile = await Profile.findOne({ user_id: studentId });

      // Check if profile exists
      if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
      }

      // Respond with the profile data
      res.json(profile);
  } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Server error while fetching profile' });
  }
});


app.get('/activities/:studentId', async (req, res) => {
  try {
      const studentId  = req.params.studentId;
      const activities = await Activity.find({ profile_id: studentId }); // Assuming activities are filtered by studentId
      res.status(200).json(activities);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

//server.js

//GET Dashboard statistics
app.get('/dashboard/stats', async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: "student" });
    //const reviewCount = await Reviews.countDocuments(); // Replace 'Reviews' with your review collection name
    const facultyCount = await User.countDocuments({ role: "faculty" })
    const assignedFacultyCount = await FacultyAssignment.countDocuments();

    res.json({ studentCount, facultyCount, assignedFacultyCount });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});
// GET: Fetch all faculties
app.get('/getfaculty', async (req, res) => {
  try {
    // Find profiles and populate only if the role in the User collection is 'faculty'
    const faculties = await Profile.find()
      .populate({
        path: 'user_id',       // Reference field in Profile that links to User
        match: { role: 'faculty' }, // Only match users with the 'faculty' role
        select: 'role'        // Only fetch the role field from User collection
      })
      .select('name branch');   // Fetch only 'name' and 'branch' fields from Profile

    // Filter out profiles where user_id does not match the faculty role
    const filteredFaculties = faculties.filter(faculty => faculty.user_id);

    res.json(filteredFaculties);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ error: "Failed to fetch faculty data" });
  }
});


// GET: Fetch all faculty-category assignments
app.get('/facultyAssignments', async (req, res) => {
  try {
    const assignments = await FacultyAssignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// POST: Assign category to faculty
app.post('/facultyAssignments', async (req, res) => {
  try {
    const { faculty_id, category_id } = req.body;
    
    // Check that both facultyId and categoryId are provided
    if (!faculty_id || !category_id) {
      return res.status(400).json({ message: 'Faculty ID and Category ID are required' });
    }

    // Insert or update the assignment in the facultyAssignments collection
    const result = await FacultyAssignment.updateOne(
      { faculty_id: faculty_id }, // Find document by faculty ID
      { $set: { category_id: category_id } }, // Set category
      { upsert: true } // Insert if not found
    );

    res.status(200).json({ message: 'Category assigned successfully', result });
  } catch (error) {
    console.error('Error assigning category:', error);
    res.status(500).json({ message: error.message });
  }
});