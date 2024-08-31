const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');
const { createProfile, getProfileById, updateProfileById, deleteProfileById } = require('../controllers/profileController');
const { createActivity, getActivityById, updateActivityById, deleteActivityById } = require('../controllers/activityController');
const { createApproval, getApprovalById, updateApprovalById, deleteApprovalById } = require('../controllers/approvalController');
const { createDocument, getDocumentById, updateDocumentById, deleteDocumentById } = require('../controllers/documentController');

// User Routes
router.post('/user', createUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);

// Profile Routes
router.post('/profile', createProfile);
router.get('/profile/:id', getProfileById);
router.put('/profile/:id', updateProfileById);
router.delete('/profile/:id', deleteProfileById);

// Activity Routes
router.post('/activity', createActivity);
router.get('/activity/:id', getActivityById);
router.put('/activity/:id', updateActivityById);
router.delete('/activity/:id', deleteActivityById);

// Approval Routes
router.post('/approval', createApproval);
router.get('/approval/:id', getApprovalById);
router.put('/approval/:id', updateApprovalById);
router.delete('/approval/:id', deleteApprovalById);

// Document Routes
router.post('/document', createDocument);
router.get('/document/:id', getDocumentById);
router.put('/document/:id', updateDocumentById);
router.delete('/document/:id', deleteDocumentById);

module.exports = router;
