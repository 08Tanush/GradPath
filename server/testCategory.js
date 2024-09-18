const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Adjust the path as necessary
const Category = require('./models/categories'); // Adjust the path as necessary

// Function to test retrieving categories
const testGetCategories = async () => {
    try {
        // Connect to the database
        await connectDB();

        // Fetch categories from the database
        const categories = await Category.find({}).exec();

        // Log the categories to the console
        console.log('Categories:', categories);

        // Close the database connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Error fetching categories:', err.message);
    }
};

// Run the test
testGetCategories();
