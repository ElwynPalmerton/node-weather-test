const request = require("request");


const forecast = (latitude, longitude, callback) => {
  const latLong = latitude + "," + longitude;

  const url =
    "http://api.weatherstack.com/current?access_key=90d40a1ffde9a466fe9fa5d0f87b4019&query=" + latLong + "&units=f";

  request({
    url,
    json: true
  }, (error, {
    body
  }) => {
    if (error) {
      callback("Unable to connect to the weather service.", null);
    } else if (body.error) {
      callback(body.error.info, null);
    } else {
      callback(null, body);
    }
  });
}

module.exports = forecast;