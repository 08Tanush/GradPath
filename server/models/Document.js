// Create a new Document
async function createDocument(req, res) {
    try {
        const newDocument = new Document(req.body);
        const document = await newDocument.save();
        res.json(document);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read a Document by ID
async function getDocumentById(req, res) {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) return res.status(404).json({ message: 'Document not found' });
        res.json(document);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a Document by ID
async function updateDocumentById(req, res) {
    try {
        const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDocument);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete a Document by ID
async function deleteDocumentById(req, res) {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
