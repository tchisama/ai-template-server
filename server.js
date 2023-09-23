// app.js
const express = require('express');
const cors = require('cors');
const OpenAI =require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3001; // Change this to your desired port number

// Enable CORS for all routes (You can customize this further)
app.use(cors());

// Use body-parser middleware to parse JSON
app.use(express.json());

// Define a simple route
app.post('/api/genirate', async(req, res) => {
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "Your task is to generate HTML templates based on input messages. You will receive objects like this:\\n{\\n\\\"message\\\": \\\"info text\\\",\\n\\\"code\\\": \\\"code\\\"\\n}\\nYou should return an HTML template based on the 'message' , use css classes with uppercase name and ids dont select with elements like [input,*,body,button].use the link of fontawsome and add icons to buttons. If you provide a 'code', the template should be modified based on the code provided. Use this image as the default image URL: 'https://th.bing.com/th/id/R.77ca77d32b8b8e97122ff20b2fff9658?rik=gFvl%2bFaxCCSU9A&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f24%2f66%2fjVJNKu.png&ehk=BeYPDSonYIebD%2fPBR8lb2uwto%2fWI46j07m6ceP5IG2c%3d&risl=&pid=ImgRaw&r=0'."
      },
      {
        "role": "user",
        "content": "{\n\"message\":\"a black button , rounded and have a hover\",\n\"code\":\"\"\n}"
      },
      {
        "role": "assistant",
        "content": "\n<html>\n<head> <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\"> \n<style>\n.BUTTON {\n  background-color: black;\n  border: none;\n  color: white;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  border-radius: 50px;\n}\n\n.BUTTON:hover {\n  background-color: #555555;\n}\n</style>\n</head>\n<body>\n\n<button class=\"BUTTON\">Click Me</button>\n\n</body>\n</html>"
      },
      {
        "role": "user",
        "content": "{\n\"message\":\""+req.body.message+"\",\n\"code\":"+req.body.code+"\"\"\n}"
      },
    ],
    temperature: 1,
    max_tokens: 1174,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});
  res.send(response.choices[0].message.content);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// This code is for v4 of the openai package: npmjs.com/package/openai