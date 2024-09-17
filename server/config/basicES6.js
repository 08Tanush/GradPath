import mongoose from 'mongoose'; // Use import for ES6 modules
import express from 'express';

const app = express();

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/");
  console.log('Connected to MongoDB');
} catch (err) {
  console.error('Failed to connect to MongoDB', err);
}

app.get('/', (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
