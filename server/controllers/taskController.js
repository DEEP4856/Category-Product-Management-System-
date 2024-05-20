const User = require('../../database/model/user.model');
const Category= require('../../database/model/catagory.model');
const Product = require('../../database/model/product.model')




const addTask = async (req, res) => {
    const { categoryName, description, status, id } = req.body;
  
    try {
        // Check if categoryName is provided
        if (!categoryName) return res.status(400).send('Please enter the category name');
  
        // Check if description is provided
        if (!description) return res.status(400).send('Please enter the description');
  
        // Check if status is provided and valid
        if (!status || (status !== 'active' && status !== 'inactive')) return res.status(400).send('Please provide a valid status');
  
        // Create a new task object
        const taskDetail = new Category({
            categoryName,
            description,
            status,
            createdBy: id,
        });
  
        // Save the task object
        await taskDetail.save();
  
        return res.status(200).send(taskDetail);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Task addition failed');
    }
};

// For testing purposes, let's simulate a request object with the required fields
const req = {
    body: {
        categoryName: 'Example Category',
        description: 'Example Description',
        status: 'active',
        id: 'user123'
    }
};

// For testing purposes, let's simulate a response object
const res = {
    status: function(code) {
        console.log("Status:", code);
        return this;
    },
    send: function(message) {
        console.log("Message:", message);
        return this;
    }
};

// Call the addTask function with the simulated request and response objects
addTask(req, res);

  






const getAllTasks = async (req, res) => {
	const { id } = req.query;
	try {
		let tasklist = await  Category.find({ cretedBy: id }).limit(20);
		return res.status(200).send(tasklist);
	} catch (error) {
		return res.status(400).send(error);
	}
};




const getOneTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Extract task ID from request parameters

    // Find task by ID in the database
    const task = await Category.findById(taskId);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // If task found, return it in the response
    res.json(task);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





const editTask = async (req, res) => {
  try {
    const id = req.params.id; // Corrected parameter name

    // Log the request payload for debugging
    console.log('Request Payload:', req.body);

    // Check if the document with the provided ID exists
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the category and return the updated document
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    console.log('Updated Category:', updatedCategory);

    // Return the updated category
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ message: 'Server error, please check' });
  }
};















const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await  Category.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};







const addProduct = async (req, res) => {
  const { categoryName, productName, packSize, mrp, status } = req.body;
  const productImage = req.file.filename; // Get the file path from req.file

  try {
    // Check if categoryName is provided and valid
    if (!categoryName || (categoryName !== 'Milk' && categoryName !== 'Fruits')) {
      return res.status(400).send('Please provide a valid category name (Milk or Fruits)');
    }

    // Check if productName is provided
    if (!productName) {
      return res.status(400).send('Please enter the product name');
    }

    // Check if packSize is provided
    if (!packSize) {
      return res.status(400).send('Please enter the pack size');
    }

    // Check if mrp is provided and valid
    if (!mrp || isNaN(mrp) || mrp <= 0) {
      return res.status(400).send('Please provide a valid MRP (Maximum Retail Price)');
    }

    // Check if status is provided and valid
    if (!status || (status !== 'active' && status !== 'inactive')) {
      return res.status(400).send('Please provide a valid status (active or inactive)');
    }

    // Create a new product object
    const newProduct = new Product({
      categoryName,
      productName,
      packSize,
      mrp,
      productImage, // Set productImage to the file path
      status,
    });

    // Save the product object
    await newProduct.save();

    return res.status(200).send(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Product addition failed');
  }
};



const getAllProducts = async (req, res) => {
  const { id } = req.query;
  try {
      let productList = await Product.find({ createdBy: id }).limit(20);
      return res.status(200).send(productList);
  } catch (error) {
      return res.status(400).send(error);
  }
};



const getOneProduct = async (req, res) => {
  try {
      const productId = req.params.id; // Extract product ID from request parameters

      // Find product by ID in the database
      const product = await Product.findById(productId);

      // Check if product exists
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      // If product found, return it in the response
      res.json(product);
  } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};




const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    existingProduct.categoryName = req.body.categoryName;
    existingProduct.productName = req.body.productName;
    existingProduct.packSize = req.body.packSize;
    existingProduct.mrp = req.body.mrp;
    existingProduct.status = req.body.status;

    // Update the productImage field if a new file was uploaded
    if (req.file) {
      existingProduct.productImage = req.file.path; // Or any other data you want to store for the image
    }

    const updatedProduct = await existingProduct.save();
    console.log('Updated Product:', updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ message: 'Server error, please check' });
  }
};




const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
      let response = await Product.findByIdAndDelete(id);
      if (response) {
          return res.status(200).send(response);
      } else {
          return res.status(404).send('Product not found');
      }
  } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).send('deleteFailed');
  }
};


// const path = require('path');

// const imagePath = path.join(__dirname, '../public/images');

// const getImageById = (req, res) => {
//     const { id } = req.params;

//     // Logic to fetch the image based on its ID from your storage
//     // For example, if your images are stored with filenames including their IDs
//     const imageName = `${id}.jpg`; // Assuming images have jpg extension
//     const imagePath = path.join(imagePath, imageName);

//     // Send the image file as a response
//     res.sendFile(imagePath);
// };








module.exports = {
  // getImageById,
	addTask,
	getAllTasks,
  getOneTask,
	editTask,
	deleteTask,
  addProduct,
  getAllProducts,
  getOneProduct,
  editProduct,
  deleteProduct,
  
};
