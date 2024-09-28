
// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);


module.exports = {Category};

const express = require('express');
const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loading categories' });
  }
});

