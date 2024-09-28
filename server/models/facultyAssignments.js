// models/FacultyAssignment.js
const mongoose = require('mongoose');

const facultyAssignmentSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assigned_at: { type: Date, default: Date.now }
  });
  
  const FacultyAssignment = mongoose.model('FacultyAssignment', facultyAssignmentSchema);
  

export default FacultyAssignment;
