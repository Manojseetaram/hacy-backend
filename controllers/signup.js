const bcrypt = require("bcryptjs");
const User = require("../models/User");

const signUp = async (req, res) => {
    const { fullName, email, phone, password } = req.body;
  
    // Check if all required fields are provided
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
  
    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const user = new User({
        fullName,
        email,
        phone,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await user.save();
  
      // Respond with success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error });
    }
  }

module.exports=signUp;