// models/CategoryField.js
import mongoose from 'mongoose';

const categoryFieldSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    field_name: { type: String, required: true },
    field_type: { type: String, enum: ['text', 'dropdown', 'date', 'number', 'file'], required: true },
    options: { type: String },  // JSON string for dropdown options
    is_required: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const CategoryField = mongoose.model('CategoryField', categoryFieldSchema);

export default CategoryField;
