const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const taskController = require('../controllers/taskController');





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
  
  // Route for handling file uploads and adding a new product
  router.post('/addpro', upload.single('productImage'), taskController.addProduct);
  
//   router.get('/:id', taskController.getImageById);

router.route('/addpro').post(taskController.addProduct);
router.route('/getpro').get(taskController.getAllProducts);
 router.route('/pro/:id').get(taskController.getOneProduct);
router.route('/edit/:id').put(taskController.editProduct);
router.route('/edit/:id').put(upload.single('productImage'), taskController.editProduct);
router.route('/:id').delete(taskController.deleteProduct);

module.exports = router;

