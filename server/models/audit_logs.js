const auditLogSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    action: { type: String, required: true },
    log_timestamp: { type: Date, default: Date.now }
  });
  
  const AuditLog = mongoose.model('AuditLog', auditLogSchema);
  