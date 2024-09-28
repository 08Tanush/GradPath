const activityFieldSchema = new mongoose.Schema({
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    field_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryField', required: true },
    field_value: { type: String, required: true },
    uploaded_at: { type: Date, default: Date.now }
  });
  
  const ActivityField = mongoose.model('ActivityField', activityFieldSchema);
  module.exports = {ActivityField};