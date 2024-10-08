
// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);


module.exports = {Category};
