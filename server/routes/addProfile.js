const express = require('express');
const Profile = require('../models/profiles'); // Assuming your profile schema is in models/Profile.js
const auth = require('../middleware/auth'); // Middleware to authenticate token


const router = express.Router();

// POST: Submit Student Profile
router.post('/submitProfile', auth, async (req, res) => {
  try {
    const { name, class: studentClass, branch, currentPosition, sinceWhen, about, skills, email, contactNumber, github, linkedin, website } = req.body;

    // Create a new profile document
    const profile = new Profile({
      user_id: req.user.userId, // Get userId from the authenticated token (auth middleware)
      name,
      class: studentClass,
      branch,
      current_position: currentPosition,
      since_when: new Date(sinceWhen),
      about,
      skills: skills.split(','), // Split the skills string into an array
      email,
      contact_number: contactNumber,
      github,
      linkedin,
      website,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Save profile to the database
    await profile.save();

    // Respond with success
    res.status(201).json({ message: 'Profile created successfully', profile });

  } catch (error) {
    console.error('Error submitting profile:', error);
    res.status(500).json({ message: 'Server error while submitting profile' });
  }
});

module.exports = {router};