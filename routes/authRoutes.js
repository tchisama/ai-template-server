const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model defined

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, photoProfile } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      photoProfile,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

