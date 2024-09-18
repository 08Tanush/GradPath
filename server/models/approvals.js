// models/Approval.js
const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
    document_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
    approver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], required: true },
    comments: { type: String },
    approved_at: { type: Date }
});

const Approval = mongoose.model('Approval', approvalSchema);

export default Approval;
