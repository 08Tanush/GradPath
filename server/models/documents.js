// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    doc_path: { type: String, required: true },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    doc_type: { type: String, enum: ['image', 'pdf'], required: true },
    uploaded_at: { type: Date, default: Date.now }
  });
  
  const Document = mongoose.model('Document', documentSchema);  

export default Document;
