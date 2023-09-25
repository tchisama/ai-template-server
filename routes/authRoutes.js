const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model defined

// Signup route
router.post('/getuser', async (req, res) => {
  try {
    const { name, email, photoProfile,user_id } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({
        message:"User already in database",
        user:existingUser
      }
        );
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      photoProfile,
      user_id,
      user_point:8000,
      used_point:0,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user:newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
