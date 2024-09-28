const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the user
    name: { type: String, required: true }, // Full Name
    class: { type: String }, // Class of the student
    branch: { type: String }, // Branch or Department
    current_position: { type: String }, // Current Position (e.g., Class Representative)
    since_when: { type: Date }, // Since when they hold the position
    about: { type: String }, // About You
    skills: { type: [String] }, // Array of skills, separated by commas
    email: { type: String, required: true }, // Email ID
    profile_picture: { type: String }, // Profile picture URL or file path
    contact_number: { type: String }, // Contact Number
    github: { type: String }, // GitHub Profile Link
    linkedin: { type: String }, // LinkedIn Profile Link
    website: { type: String }, // Personal Website Link
    dob: { type: Date }, // Date of birth (can be used for future purposes if needed)
    start_year: { type: String, required: true }, // Start Year (e.g., Year of admission)
    current_year: { type: String }, // Current academic year
    position: { type: String }, // For faculty/admin
    created_at: { type: Date, default: Date.now }, // Created timestamp
    updated_at: { type: Date, default: Date.now } // Updated timestamp
});

// Adding method to update updated_at whenever document is modified
profileSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
