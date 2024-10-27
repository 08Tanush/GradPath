const mongoose = require('mongoose');
const connectDB = require('../config/db');

const activitySchema = new mongoose.Schema({
  profile_id: { type: String, required: true },  // Refers to the user
  category_id: { type: String, required: true }, // Refers to the category
  start_dateTime: { type: Date, required: true },
  end_dateTime: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String },
  visibility: { type: String, enum: ['private', 'public', 'specific'], required: true },
  location: { type: String },
  approval_status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  faculty_id: { type: String }, // Refers to the faculty/user
  editable_until: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = { Activity };
