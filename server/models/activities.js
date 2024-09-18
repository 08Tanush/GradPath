const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Define the Activity schema
const activitySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  profile_id: { type: Number, required: true },
  category_id: { type: Number, required: true },
  start_dateTime: { type: Date, required: true },
  end_dateTime: { type: Date, required: true },
  title: { type: String, required: true },
  desc: { type: String },
  visibility: { type: String, enum: ['private', 'public', 'specific'], required: true },
  location: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'approved', 'rejected'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = {Activity};