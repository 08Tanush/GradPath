// models/Approval.js
const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    approval_status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    remark: { type: String },
    approval_dateTime: { type: Date, default: Date.now }
  });
  
  const Approval = mongoose.model('Approval', approvalSchema);
  

export default Approval;
