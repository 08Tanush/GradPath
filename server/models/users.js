// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    pass_hash: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['student', 'faculty', 'admin'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
