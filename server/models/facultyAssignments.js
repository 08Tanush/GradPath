// models/FacultyAssignment.js
import mongoose from 'mongoose';

const facultyAssignmentSchema = new mongoose.Schema({
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assigned_at: { type: Date, default: Date.now }
});

const FacultyAssignment = mongoose.model('FacultyAssignment', facultyAssignmentSchema);

export default FacultyAssignment;
