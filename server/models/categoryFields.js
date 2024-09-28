// models/CategoryField.js
const mongoose = require('mongoose');
const express = require('express');

const categoryFieldSchema = new mongoose.Schema({
  category_id: { type: String, ref: 'Category', required: true },
  field_name: { type: String, required: true },
  field_type: { type: String, enum: ['text', 'number', 'file', 'dropdown'], required: true },
  options: { type: String }, // JSON string for dropdown options
  is_required: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
}, { collection: 'categoryFields' }); // Specify the collection name here

const CategoryField = mongoose.model('categoryFields', categoryFieldSchema);
module.exports = {CategoryField};