const mongoose = require('mongoose');
const connectDB = require('../config/db');

const activityFieldSchema = new mongoose.Schema({
    activity_id: { type: String, required: true }, // Refers to the Activity as a String
    field_id: { type: String, required: true }, // Refers to the CategoryField as a String
    field_value: { type: String, required: true },
    uploaded_at: { type: Date, default: Date.now }
});

const ActivityField = mongoose.model('ActivityField', activityFieldSchema);
module.exports = { ActivityField };
