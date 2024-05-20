const mongoose = require('mongoose');


const mongoURI = 'mongodb://127.0.0.1:27017/catogory-product-management';
// const mongoOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Connect to MongoDB database
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  