// models/Activity.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    start_dateTime: { type: Date, required: true },
    end_dateTime: { type: Date, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    visibility: { type: String, enum: ['public', 'private'], required: true },
    location: { type: String },
    status: { type: String, enum: ['approved', 'pending', 'rejected'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
