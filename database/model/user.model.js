const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// 1:39

//Password hashing is the process of converting a plain-text password into a scrambled, irreversible string of characters called a hash.

//Salting is an additional security measure used in conjunction with password hashing.
// A random value, known as a salt, is generated for each password before it's hashed.

// Define the schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Middleware to hash the password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (password, next) {
	bcrypt.compare(password, this.password, function (err, match) {
		if (err) {
			return next(err, false);
		}

		return next(null, match);
	});
};

// Create the model
const User = mongoose.model('User', UserSchema);

module.exports = User;
