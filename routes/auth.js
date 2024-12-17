const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Adjust path if necessary
const {zodLoginverify} = require("../middlewares/zodlogin");
const {userjwtverify} = require("../middlewares/userJWt")
const router = express.Router();

// Registration Route
router.post('/register', zodLoginverify, require("../controllers/signup"));
router.get("/verifyEmail",require("../controllers/verifyEmail")); 
router.post('/signin', require("../controllers/signin") );
router.get("/forgotPassword",require("../controllers/forgotPassword"))
router.get("/resetPasswordOtp",require("../controllers/resetPasswordOtp"))


// Export the router
module.exports = router;