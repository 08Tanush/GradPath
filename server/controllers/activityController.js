const Category = require('../models/categories');
const CategoryField = require('../models/categoryFields');
const Activity = require('../models/Activities');

// Get categories from DBconst Category = require('../models/Activity');

// @desc    Get all categories
// @route   GET /api/categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

module.exports = {
    getCategories,
};


// Get category-specific fields
exports.getCategoryFields = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const fields = await CategoryField.find({ category_id: categoryId });
        res.json({ fields });
    } catch (err) {
        res.status(500).send('Error fetching fields');
    }
};

// Upload an activity
exports.uploadActivity = (req, res) => {
    const activityData = {
        title: req.body.title,
        description: req.body.desc,
        category: req.body.category,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
        location: req.body.location,
        visibility: req.body.visibility,
        document: req.file ? req.file.filename : null
    };

    const activity = new Activity(activityData);
    activity.save()
        .then(() => res.send('Activity uploaded successfully!'))
        .catch(err => res.status(500).send('Error uploading activity'));
};
