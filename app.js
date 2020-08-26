const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");


//Set up Handlebars config.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static assets.
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index',
    {
      name: "Elwyn",
      title: "Weather App!"
    });
});

app.get('/about', (req, res) => {
  res.render('about',
    {
      name: "Godzilla",
      title: "ABOUT"
    });
});

app.get('/help', (req, res) => {
  res.render('help',
    {
      helpText: "This is some helpful text.",
      name: "Elwyn",
      title: "HELP"
    });
});


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide a search term." });
  }

  const address = req.query.address;

  geocode(address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {

    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, {
      current
    }) => {
      if (error) {
        return res.send({ error, });
      }

      return res.send(
        {
          location: location,
          currentWeather: current,//current.weather_descriptions, 
          note: "Should return actual weather.",
        }
      );
    })
  });
})

//No address - send the error message "Must provide an address"
//Address =Send back the JSOn with the address in it.
//Test /weather and /weather?address=Philadelphia

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide a search term." });
  }
  console.log(req.query);
  res.send({
    products: [
      'hammer', 'nails', 'chewing gum'
    ]
  });
})

app.get('/help/*', (req, res) => {
  const msg = "Help info not found";
  res.render('error-page', {
    msg: msg,
    name: "Elwyn",
    title: "404"
  })
})

app.get('*', (req, res) => {
  const msg = "Page not found";
  res.render('error-page', {
    msg: msg,
    name: "Elwyn",
    title: "404"
  })
});


app.listen(3000, console.log("Listening"));