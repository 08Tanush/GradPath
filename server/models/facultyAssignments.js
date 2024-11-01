const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Schema = mongoose.Schema;

const facultyAssignmentSchema = new Schema({
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming User is the faculty model
    required: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Assuming Category is the category model
    required: true
  },
  assigned_at: {
    type: Date, 
    default: Date.now
  }
}, { versionKey: false , collection: 'facultyAssignments'}); // versionKey as an option here

const FacultyAssignment = mongoose.model('FacultyAssignment', facultyAssignmentSchema);
// Export the model
module.exports = { FacultyAssignment };