const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Adjust path if necessary
const router = express.Router();

// Registration Route
router.post('/register', require("../controllers/signup"));
router.post("/signin", require("../controllers/signin") );

// Export the router
module.exports = router;
