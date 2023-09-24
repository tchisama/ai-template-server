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

router.post('/get-sketch', async (req, res) => {
  try {
    const { id } = req.body;

    const sketch = await Sketch.findById(id)


    res.status(201).json(sketch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/update-sketch', async (req, res) => {
  try {
    const { id , data , name } = req.body;

    const sketch = await Sketch.findByIdAndUpdate(id,{
        $set:{
            data,
            name
        }
    })


    res.status(201).json({...sketch._doc,data,name});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/delete-sketch', async (req, res) => {
  try {
    const { id } = req.body;

    const sketch = await Sketch.findByIdAndDelete(id)


    res.status(201).json({message:"delete done"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;

