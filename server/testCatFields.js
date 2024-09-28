// Fetch all fields and log them
const mongoose = require('mongoose');
const {Category} = require('./models/categories');
const {CategoryField} = require('./models/categoryFields');
const { ObjectId } = mongoose.Types;
const allFields = CategoryField.find();
console.log('All Fields:', allFields); // Log all fields to check their structure

// Check the categoryId being used
console.log('Category ID being used:', ObjectId);
