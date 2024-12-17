const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const nodemailer = require('nodemailer')


// const transporter = nodemailer.createTransport({
//   host :"smpt.hostinger.com",
//   port:465,
//   secure:true,
//   auth: {
//       user: 'info@hacfy.com', 
//       pass: 'momz dgnz diha lmpy '   
//   }
// });

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
      const hashedPassword = await bcrypt.hash(password, 10)

      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

      // Create a new user object
      const user = new User({
        fullName,
        email,
        phone,
        password: hashedPassword,
        verified:false,
        verificationToken
      });
  
      await user.save();


    //   await transporter.sendMail({
    //     from: 'ashithkumargowda.aiet@gmail.com',
    //     to: email,
    //     subject: 'Email Verification',
    //     html: `<h3>Hello ${fullName},</h3><p>This is your OTP:</p> 
    //       <p>${verificationToken}</p>`
    // })
    
  
   
      res.status(201).json({ message: 'User registered successfully',email });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error });
    }
  }

module.exports=signUp;