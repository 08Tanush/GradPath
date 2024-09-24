// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/GradPath', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));


const corsOptions = {
  origin: 'http://127.0.0.1:5501', // Allow this specific origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Create the Activity model
const {Activity} = require('./models/Activities');

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