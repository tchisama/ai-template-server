
const express = require('express');
const router = express.Router();
const OpenAI =require("openai");
require('dotenv').config();
const User = require('../models/user'); // Assuming you have a User model defined


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Signup route
router.post('/genirate', async (req, res) => {

  const getUser = await User.findOne({user_id:req.body.id})
  if(getUser){
      if((getUser.user_point-getUser.used_point)>0){
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "Your mission is to generate HTML templates in response to user requests. Regardless of the user's input, you are expected to provide an HTML template as a response. The user input will be in the form of objects like this:\\\\n{\\\\n  \\\\\\\"message\\\\\\\": \\\\\\\"info text\\\\\\\",\\\\n  \\\\\\\"code\\\\\\\": \\\\\\\"code\\\\\\\"\\\\n}\\\\nYour task is to create an HTML template based on the 'message' provided, applying CSS classes with UPPERCASE names such as [CARD, BUTTON ...] while avoiding lowercase names like [container, button]. Additionally, refrain from selecting elements like [input, *, body, button]. To enhance the template, use the FontAwesome library CDN to add icons to buttons and other relevant elements, matching the button titles. If the input includes a 'code,' ensure that the template reflects this accordingly. If you require an image in the template, please utilize the following default image URL:\\\\n\\\\nhttps://th.bing.com/th/id/OIP.Bgzv3R-bGdPjWp7Mwgn58wHaEo?pid=ImgDet&rs=1\n.\nfor a better UI, consider implementing  color schemes that match the branding, and modern layout techniques. Apply consistent padding and margins and border radius, use appropriate fonts, and ensure that the user interface is user-friendly and intuitive.\nYou can also utilize Google Fonts to enhance the appearance of your fonts and give your template a unique and attractive style.\n\nimportant:\n1 - dont use lowercase letters in classes names\n2 - always use icons for better ui"
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
        const pointUsed = getUser.used_point + response.choices[0].message.content.length + req.body.code.length + req.body.message.length
        const done = pointUsed > getUser.user_point? getUser.user_point: pointUsed
        await User.findByIdAndUpdate(getUser._id,{$set:{
            used_point: done
        }})
        res.send({message:"good",data:response.choices[0].message.content});
      }else{
        res.send({message:"no more points",data:req.body.code});
      }
  }else{
        res.send({message:"no user found",data:req.body.code});
  }
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

