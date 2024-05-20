const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const User = require('../../database/model/user.model')



// // Function to generate JWT token
// const generateToken = (user) => {
//   return  jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//       username: user.username
//     },

//     'kjkhsbcvvchcvasjvcandjwvhchj', // You should define this secret in your environment variables
//     { expiresIn: '24h' } // Token expires in 24 hour
//   );
// };





// Controller logic for user registration
const register = async (req, res) => {
	console.log(req.body, 'req');
	const { username, password, email } = req.body;
	try {
		if (!username) return res.status(400).send('username is required');

		if (!email) return res.status(400).send('email is required');

		if (!emailValidator.validate(email)) {
			return res.status(400).send('enter valid email id');
		}
		if (!password || password.length < 3) {
			return res.status(400).send('enter valid password');
		}

		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).send('email is taken');
		}

		const user = new User({
      email,
      username,
      password,
    });

		await user.save();
		return res.status(200).send(user);
	} catch (error) {
		return res.status(400).send('Error creating user');
	}
  };
  







// Controller logic for user login
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    // Find user by email
    const user = await User.findOne({ email });
   
     if (!user) return res.status(400).send('Email does not exist');

    // Compare passwords
    user.comparePassword(password, async (err, isMatch) => {

      if (!isMatch || err) return res.status(400).send('password does not match');
			let token = jwt.sign({ _id: user._id }, 'kljclsadflkdsjfklsdjfklsdjf', {
				expiresIn: '24h',
			});
;
      console.log("user found");
      // Return success response with token and user details
      return res.status(200).send({
        token,
        username: user.username,
        email: user.email,
        id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
  
    });
  } catch (error) {
   
    console.error('Error logging in:', error); // Log error for debugging
    return res.status(500).send('Error logging in');
  }
};



module.exports = {
  signin, 
  register,
};
