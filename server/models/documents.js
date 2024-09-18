// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    fields: { type: Map, of: mongoose.Schema.Types.Mixed },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
