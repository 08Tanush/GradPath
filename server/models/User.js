// Create a new User
async function createUser(req, res) {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read a User by ID
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a User by ID
async function updateUserById(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete a User by ID
async function deleteUserById(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
