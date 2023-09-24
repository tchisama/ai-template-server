// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const { mongoURI } = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const sketchRoutes = require('./routes/sketchRoutes');
const aiRoutes = require('./routes/aiRoutes');

mongoose.connect(mongoURI)
const conn = mongoose.connection
conn.once("open",()=>{
  console.log("done connecting")
})



const app = express();
const port = 3001; // Change this to your desired port number

// Enable CORS for all routes (You can customize this further)
app.use(cors());

// Use body-parser middleware to parse JSON
app.use(express.json());

app.use('/auth',authRoutes)
app.use('/sketch',sketchRoutes)
app.use('/ai',aiRoutes)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// This code is for v4 of the openai package: npmjs.com/package/openai