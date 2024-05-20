const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoute');
const taskRoutes = require('./routes/taskRoute');
const productRoutes = require('./routes/productRoute');
require('../database/db');

const app = express();
const port = 4000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the full path to the directory where files should be stored
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + path.extname(file.originalname)); // Generate unique filenames
  }
});
const upload = multer({ storage: storage });











app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/product', productRoutes); // Use product routes
app.use(morgan('dev'));

app.get('/',(req,res)=>{
 res.send("server is running")
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
