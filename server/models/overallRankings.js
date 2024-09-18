// models/OverallRanking.js
const mongoose = require('mongoose');

const overallRankingSchema = new mongoose.Schema({
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    total_score: { type: Number, required: true },
    rank_position: { type: Number, required: true },
    calculated_at: { type: Date, default: Date.now }
});

const OverallRanking = mongoose.model('OverallRanking', overallRankingSchema);

export default OverallRanking;
