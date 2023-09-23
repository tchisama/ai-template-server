const express = require('express');
const router = express.Router();
const Sketch = require('../models/sketch'); // Assuming you have a User model defined

// Signup route
router.post('/create', async (req, res) => {
  try {
    const { name ,description, owner } = req.body;

    const newSketch = new Sketch({
      name,
      owner,
      data:"",
      image:"",
      description,
    });

    // Save the sketch to the database
    await newSketch.save();

    res.status(201).json(newSketch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/get-sketchs', async (req, res) => {
  try {
    const { owner } = req.body;

    const sketches = await Sketch.find({owner})


    res.status(201).json(sketches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;

