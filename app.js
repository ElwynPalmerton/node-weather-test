const express = require('express');

const path = require('path');


const app = express();

//var x = path.join('Users', 'Refsnes', 'demo_path.js');

const publicAssets = path.join(__dirname, "./public");

console.log(publicAssets);

app.use(express.static(publicAssets))


// app.get('/help', (req, res) => {
//   res.sendFile(__dirname, "/public/help.html");
// })

// app.get('/about', (req, res) => {
//   const about = path.join(__dirname, "../public/about.html");
//   res.sendFile(about);
// })



app.get('/weather', (req, res) => {
  res.send([
    {
      location: "New York",
      forecast: "fine, I guess - warm"
    }
  ]);
})


app.listen(3000, console.log("Listening"));