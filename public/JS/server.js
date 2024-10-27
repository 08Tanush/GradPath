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
// const {activityController} = require('./routes/ActivityController');
// app.use('/uploadActivity', activityController);

const {User} = require('./models/users');
// JWT Secret Key (make sure this is stored securely in production)
const JWT_SECRET = 'your-secret-key'; // Replace with an environment variable in production
const {Activity} = require('./models/Activities');
const {Category} = require('./models/categories');
const {CategoryField} = require('./models/categoryFields');
const { Approval } = require('./models/approvals');
const {FacultyAssignment} = require('./models/facultyAssignments');
const { ObjectId } = mongoose.Types; // Ensure ObjectId is imported correctly
const {Document} = require('./models/documents');

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
app.get('/activities/:studentId', async (req, res) => {
  try {
      const studentId  = req.params.studentId;
      const activities = await Activity.find({ user_id: studentId }); // Assuming activities are filtered by studentId
      res.status(200).json(activities);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

//Fetch Approval Status
app.get('/approvals', async (req, res) => {
  try {
    const approvals = await Approval.find();
    res.status(200).json(approvals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET: Fetch Approval Status based on activity ID
app.get('/approvals/:activityId', async (req, res) => {
  try {
    const activityId = new ObjectId(req.params.activityId); // Convert to ObjectId
    const approvals = await Approval.find({ activity_id: activityId });
    res.status(200).json(approvals);
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
              return res.status(400).json({ message: 'Faculty and Admin cannot be created.' });
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
// POST: Login (Authenticate the user)
app.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.pass_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Return the token and the user object
    res.status(200).json({ message: 'Login successful', token, user });
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
// app.post('/addActivity', async (req, res) => {
//   try {
//     const activityData = {
//       profile_id: mongoose.Types.ObjectId('6505c763842b9a4a6c62dbfa'), // Example Student Profile ID
//       category_id: mongoose.Types.ObjectId('66fbd2febf1d8a5ce3d29e0a'), // Example Category ID
//       start_dateTime: new Date('2024-09-28T09:00:00Z'),
//       end_dateTime: new Date('2024-09-28T12:00:00Z'),
//       title: 'Football Championship',
//       description: 'Participated in inter-college football championship.',
//       visibility: 'public',
//       location: 'DBIT Grounds',
//       approval_status: 'Pending',
//       faculty_id: mongoose.Types.ObjectId('66fbd5a6abd9a131142710bc'), // Example Faculty ID
//       editable_until: new Date('2024-09-30T23:59:59Z'),
//       created_at: new Date(),
//       updated_at: new Date()
//     };

//     const newActivity = new Activity(activityData);
//     const result = await newActivity.save();

//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Add validation for user and category existence in the activity creation route
app.post('/activities', async (req, res) => {
  try {
    const { profile_id, category_id } = req.body;

    // Ensure user and category exist
    const user = await User.findById(profile_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newActivity = new Activity(req.body);
    const result = await newActivity.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const multer = require('multer');

// Set storage destination and filename format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Folder for storing uploaded documents
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filenames
  }
});

const upload = multer({ storage: storage });

// Route for uploading documents
app.post('/activities/:id/upload', upload.single('document'), async (req, res) => {
  try {
    const activityId = req.params.id;
    const filePath = req.file.path;

    // Find activity and attach document path
    const updatedActivity = await Activity.findByIdAndUpdate(activityId, {
      document: filePath
    }, { new: true });

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Document uploaded successfully', updatedActivity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// POST: Assign faculty to a category
// app.post('/admin/assignFaculty', async (req, res) => {
//   const { faculty_id, category_id } = req.body;

//   try {
//     // Check if the faculty is already assigned to any category
//     const existingAssignment = await FacultyAssignment.findOne({ faculty_id });
//     if (existingAssignment) {
//       return res.status(400).json({ message: 'Faculty is already assigned to a category.' });
//     }

//     // Create a new assignment if no previous assignment exists
//     const newAssignment = new FacultyAssignment({ faculty_id, category_id });
//     await newAssignment.save();

//     res.status(201).json({ message: 'Faculty assigned successfully!' });
//   } catch (error) {
//     console.error('Error assigning faculty:', error);
//     res.status(500).json({ message: 'Failed to assign faculty' });
//   }
// });

// GET: Fetch all faculties
app.get('/api/faculties', async (req, res) => {
  try {
    const faculties = await User.find({role:'faculty'}); // Fetch all faculties
    res.status(200).json(faculties); // Send data back to client
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ message: 'Error fetching faculties' });
  }
});
// GET: Fetch all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    res.status(200).json(categories); // Send data back to client
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});
//obtain faculty assignments
app.get('/api/facultyAssignments', async (req, res) => {
  try {
    const facultyAssignments = await FacultyAssignment.find(); // Fetch all assignments
    res.status(200).json(facultyAssignments); // Send data back to client
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Error fetching assignments to faculties' });
  }
});

app.get('/faculty/category/:facultyId', async (req, res) => {
  try {
    const facultyId = new ObjectId(req.params.facultyId); // Correct usage with 'new'

    // Find the category assigned to the faculty
    const facultyAssignment = await FacultyAssignment.find({ faculty_id: facultyId });

    if (!facultyAssignment) {
      return res.status(404).json({ message: 'No category assigned to this faculty' });
    }

    // Send the assigned category back to the frontend
    res.status(200).json({ category_id: facultyAssignment.category_id });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});
app.get('/faculty/activities/:facultyId', async (req, res) => {
  try {
    const facultyId = req.params.facultyId;
    // Query database to fetch activities based on the faculty's assigned category
    const activities = await Activity.find({ faculty_id: facultyId, approval_status: 'Pending' });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
});
// GET: Fetch activities under a specific category that are pending approval
// Route to fetch pending activities under the faculty's assigned category
app.get('/faculty/category/activities/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const activities = await Activity.find({
      category_id: mongoose.Types.ObjectId(categoryId),
      approval_status: 'Pending'
    }).populate('profile_id category_id');

    if (!activities.length) {
      return res.status(404).json({ message: 'No pending activities for this category' });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error.message);
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
});

// PUT: Approve or Disapprove an activity
app.put('/faculty/category/activities/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params;
    const { approval_status, remark } = req.body; // 'Approved' or 'Rejected'

    // Ensure the approval status is valid
    if (!['Approved', 'Rejected'].includes(approval_status)) {
      return res.status(400).json({ message: 'Invalid approval status' });
    }

    // Fetch the activity
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if the faculty is authorized to approve this activity
    const facultyId = req.user.id; // Assuming `req.user` contains authenticated faculty info
    const facultyAssignment = await FacultyAssignment.findOne({
      faculty_id: facultyId,
      category_id: activity.category_id
    });

    if (!facultyAssignment) {
      return res.status(403).json({ message: 'You are not authorized to approve this activity' });
    }

    // Proceed with updating the activity status
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { approval_status, remark, approval_dateTime: new Date() }, // Updating status and approval date
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: `Activity ${approval_status} successfully`, activity: updatedActivity });
  } catch (error) {
    console.error('Error updating activity:', error.message);
    res.status(500).json({ message: 'Error updating activity', error: error.message });
  }
});

//to fetch data from student in portfolio
app.get('/portfolio/:studentId', async (req, res) => {
  const studentId = req.params.studentId;

  try {
      // Fetch activities by the student
      const activities = await Activity.find({ studentId: studentId });

      // Fetch and combine documents with activities
      const activitiesWithDocs = await Promise.all(activities.map(async activity => {
          const document = await Document.findOne({ activityId: activity._id });
          return {
              ...activity.toObject(),
              documentLink: document ? document.link : null,
              approvedBy: document ? document.approvedBy : null
          };
      }));

      res.json(activitiesWithDocs);
  } catch (error) {
      console.error("Error fetching portfolio data:", error);
      res.status(500).json({ error: "An error occurred while fetching portfolio data." });
  }
});

app.get('/getPortfolioData', async (req, res) => {
  try {
      // Assuming you are using sessions and have stored the studentId in req.session
      const studentId = req.session.studentId; // Dynamically fetch student ID from session

      const activities = await db.collection('Activities').find({ studentId: studentId }).toArray();
      const documents = await db.collection('Documents').find({ studentId: studentId }).toArray();

      // Structure the activities and documents as per your page's needs
      const portfolioData = activities.map(activity => {
          const document = documents.find(doc => doc.activityId === activity._id); // Match doc with activity
          return { ...activity, document: document };
      });

      res.json(portfolioData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});