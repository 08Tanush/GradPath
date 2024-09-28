const notificationSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    notification_text: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    sent_at: { type: Date, default: Date.now }
  });
  
  const Notification = mongoose.model('Notification', notificationSchema);
  