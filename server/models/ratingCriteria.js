// models/RatingCriteria.js
import mongoose from 'mongoose';

const ratingCriteriaSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    criteria_name: { type: String, required: true },
    max_score: { type: Number, required: true },
    weight: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

const RatingCriteria = mongoose.model('RatingCriteria', ratingCriteriaSchema);

export default RatingCriteria;
