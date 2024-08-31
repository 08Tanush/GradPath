// Create a new Profile
async function createProfile(req, res) {
    try {
        const newProfile = new Profile(req.body);
        const profile = await newProfile.save();
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read a Profile by ID
async function getProfileById(req, res) {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a Profile by ID
async function updateProfileById(req, res) {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete a Profile by ID
async function deleteProfileById(req, res) {
    try {
        await Profile.findByIdAndDelete(req.params.id);
        res.json({ message: 'Profile deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
