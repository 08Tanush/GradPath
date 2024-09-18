// models/CategoryField.js
const mongoose = require('mongoose');
const express = require('express');

const categoryFieldSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    field_name: { type: String, required: true },
    field_type: { type: String, enum: ['text', 'dropdown', 'date', 'number', 'file'], required: true },
    options: { type: String },  // JSON string for dropdown options
    is_required: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const CategoryField = mongoose.model('CategoryField', categoryFieldSchema);

const router = express.Router();

router.get('/categoryFields/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const fields = await CategoryField.find({ categoryId });
    res.json({ fields });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loading category fields' });
  }
});


module.exports = {CategoryField, router};