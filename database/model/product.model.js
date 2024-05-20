const mongoose = require('mongoose');

// Define schema for product
const productSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    enum: ['Milk', 'Fruits']
  },
  productName: {
    type: String,
    required: true
  },
  packSize: {
    type: String,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  productImage: {
    type: String // Store the file path as a string in the database

  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
