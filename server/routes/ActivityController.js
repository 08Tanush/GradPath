// // routes/activityController.js
// const express = require('express');
// const multer = require('multer');
// const {Activity} = require('../models/Activities');
// const { ActivityField } = require('../models/activity_fields');
// const { Document } = require('../models/documents');
// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Directory to save uploaded files

// // Route for uploading activity
// router.post('/uploadActivity', upload.single('document'), async (req, res) => {
//     try {
//         const userId = localStorage.getItem('userId'); // Assuming userId is stored in local storage
//         const { title, desc, category, startDateTime, endDateTime, location } = req.body;

//         // Create a new activity
//         const newActivity = await Activity.create({
//             profile_id: userId, // Assuming you have user authentication
//             category_id: category,
//             start_dateTime: new Date(startDateTime),
//             end_dateTime: new Date(endDateTime),
//             title,
//             description: desc,
//             visibility: 'public', // You can change this based on your needs
//             location,
//         });

//         // Save the uploaded document
//         if (req.file) {
//             const document = await Document.create({
//                 doc_path: req.file.path,
//                 activity_id: newActivity._id,
//                 doc_type: req.file.mimetype.startsWith('image') ? 'image' : 'pdf',
//             });
//         }

//         // Assuming you have category fields in the request body
//         const categoryFields = JSON.parse(req.body.categoryFields); // Get category fields from request body
//         for (const field of categoryFields) {
//             await ActivityField.create({
//                 activity_id: newActivity._id,
//                 field_id: field.field_id,
//                 field_value: field.field_value,
//             });
//         }

//         res.status(201).json({ message: 'Activity submitted successfully!' });
//     } catch (error) {
//         console.error('Error submitting activity:', error);
//         res.status(500).json({ message: 'Error submitting activity', error });
//     }
// });

// module.exports = router; // Make sure this is included
