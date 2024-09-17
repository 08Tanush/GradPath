// models/ActivityRating.js
import mongoose from 'mongoose';

const activityRatingSchema = new mongoose.Schema({
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    criteria_id: { type: mongoose.Schema.Types.ObjectId, ref: 'RatingCriteria', required: true },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rated_at: { type: Date, default: Date.now }
});

const ActivityRating = mongoose.model('ActivityRating', activityRatingSchema);

export default ActivityRating;
