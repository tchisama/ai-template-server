
const express = require('express');
const router = express.Router();
const OpenAI =require("openai");
require('dotenv').config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Signup route
router.post('/genirate', async (req, res) => {
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "Your task is to generate HTML templates based on input messages. You will receive objects like this:\\n{\\n\\\"message\\\": \\\"info text\\\",\\n\\\"code\\\": \\\"code\\\"\\n}\\nYou should return an HTML template based on the 'message' , use css classes with uppercase name and ids dont select with elements like [input,*,body,button].use the link of fontawsome and add icons to all buttons based on the button title . If you provide a 'code', the template should be modified based on the code provided. Use this image as the default image URL: 'https://th.bing.com/th/id/R.77ca77d32b8b8e97122ff20b2fff9658?rik=gFvl%2bFaxCCSU9A&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f24%2f66%2fjVJNKu.png&ehk=BeYPDSonYIebD%2fPBR8lb2uwto%2fWI46j07m6ceP5IG2c%3d&risl=&pid=ImgRaw&r=0'."
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


router.post('/recode', async (req, res) => {
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "you will get provided with a code and your work to convert it to the tech i provide you with"
    },
    {
      "role": "user",
      "content": "html : \n<html>\n<head> <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\"> \n<style>\n.BUTTON {\n  background-color: black;\n  border: none;\n  color: white;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  border-radius: 50px;\n  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);\n}\n\n.BUTTON:hover {\n  background-color: #555555;\n}\n\n.BUTTON .fa-star {\n  margin-right: 5px;\n}\n</style>\n</head>\n<body>\n\n<button class=\"BUTTON\"><i class=\"fa fa-star\"></i>Click Me</button>\n\n</body>\n</html>\n\nto react and css"
    },
    {
      "role": "assistant",
      "content": "//  css file :\n.BUTTON {\n  background-color: black;\n  border: none;\n  color: white;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  border-radius: 50px;\n  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);\n}\n\n.BUTTON:hover {\n  background-color: #555555;\n}\n\n.BUTTON .fa-star {\n  margin-right: 5px;\n}\n\n// react file :\nimport React from \"react\";\nimport \"./Button.css\";\nimport { FaStar } from \"react-icons/fa\";\n\nfunction Button() {\n  return (\n    <button className=\"BUTTON\">\n      <FaStar className=\"star-icon\" />\n      Click Me\n    </button>\n  );\n}\n\nexport default Button;"
    },
    {
      "role": "user",
      "content": "html:\n<html>\n<head>\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\">\n  <style>\n    .BUTTON {\n      background-color: #fff;\n      color: black;\n      padding: 15px;\n    }\n\n    .BUTTON:hover {\n      background-color: #eee;\n    }\n  </style>\n</head>\n<body>\n  <button class=\"BUTTON\"><i class=\"fas fa-cat\"></i> Click Me</button>\n</body>\n</html>\nto vuejs and tailwindcss"
    },
    {
      "role": "assistant",
      "content": "<!-- Vue template -->\n<template>\n  <button class=\"bg-white text-black p-4 hover:bg-gray-300\">\n    <i class=\"fas fa-cat\"></i> Click Me\n  </button>\n</template>\n\n<!-- Vue script -->\n<script>\nexport default {\n  name: \"Button\",\n};\n</script>\n"
    },
    {
      "role": "user",
      "content": "html: \n "+req.body.code+"\nto "+req.body.framework+" and "+req.body.styling
    }
  ],
  temperature: 1,
  max_tokens: 1280,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
  res.send(response.choices[0].message.content);
});


module.exports = router;

