// Create a new Activity
async function createActivity(req, res) {
    try {
        const newActivity = new Activity(req.body);
        const activity = await newActivity.save();
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read an Activity by ID
async function getActivityById(req, res) {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update an Activity by ID
async function updateActivityById(req, res) {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete an Activity by ID
async function deleteActivityById(req, res) {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.json({ message: 'Activity deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
