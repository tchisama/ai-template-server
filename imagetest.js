const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' }); // Use 'new' for the new Headless mode
    const page = await browser.newPage();


  const htmlContent = `
  <html lang="en">
  <head> 
  <style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 300px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 10px;
  }
  
  .image {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .price {
    font-size: 16px;
    font-weight: bold;
  }
  
  .button {
    background-color: black;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .button:hover {
    background-color: #555555;
  }
  </style>
  </head>
  <body>
  
  <div class="container">
    <div class="title">Product Title</div>
    <div class="price">$19.99</div>
    <button class="button">Add to Cart</button>
  </div>
  
  </body>
  </html>
  `;


  // Load the data URL
  const dataUrl = 'data:text/html,<!DOCTYPE html>'+htmlContent // Your data URL here
  await page.goto(dataUrl, { waitUntil: 'networkidle0' });


  await page.setViewport({ width: 800, height: 600 }); // Adjust dimensions as needed


  // Capture a screenshot (or do other actions)
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();





