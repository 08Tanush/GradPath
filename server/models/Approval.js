// Create a new Approval
async function createApproval(req, res) {
    try {
        const newApproval = new Approval(req.body);
        const approval = await newApproval.save();
        res.json(approval);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read an Approval by ID
async function getApprovalById(req, res) {
    try {
        const approval = await Approval.findById(req.params.id);
        if (!approval) return res.status(404).json({ message: 'Approval not found' });
        res.json(approval);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update an Approval by ID
async function updateApprovalById(req, res) {
    try {
        const updatedApproval = await Approval.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedApproval);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete an Approval by ID
async function deleteApprovalById(req, res) {
    try {
        await Approval.findByIdAndDelete(req.params.id);
        res.json({ message: 'Approval deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
