   // categoryModel.js

const mongoose = require('mongoose');

// Define schema for category
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

// Create and export the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
