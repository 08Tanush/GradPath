// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    start_year: { type: Number, required: true },
    current_year: { type: Number, required: true },
    about: { type: String },
    position: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
