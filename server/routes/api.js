const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Fetch categories and fields
router.get('/categories', activityController.getCategories);
router.get('/categoryFields/:categoryId', activityController.getCategoryFields);

// Upload activity
router.post('/uploadActivity', activityController.uploadActivity);

module.exports = router;
const port=3000
app.get('/api/activities', async (req, res) => {
    try {
      const activities = await Activity.find().sort({ start_dateTime: -1 });
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

