const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=1&access_token=pk.eyJ1IjoiZWx3eW5wYWxtZXJ0b24iLCJhIjoiY2tjYjg3aThqMDQ5czMwbnkwbjQ4ZGNmYyJ9.oW8pVmrCP4el_chmnd1xmQ";

  request({
    url: url,
    json: true
  }, (error, {
    body
  }) => {

    if (error) {
      callback("Unable to connect to mapbox.", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find location. Please enter a new search result.",
        undefined
      );
    } else {
      callback(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });

    }
  });
};

module.exports = geocode;


//URI components as distinct variables:
//
// const mapBoxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

// const mapBoxPlace = encodeURIComponent("Los Angeles.json");

// const option = "limit=1";

// const tokenParam =
//   "access_token=pk.eyJ1IjoiZWx3eW5wYWxtZXJ0b24iLCJhIjoiY2tjYjg3aThqMDQ5czMwbnkwbjQ4ZGNmYyJ9.oW8pVmrCP4el_chmnd1xmQ";

// const fullURL = mapBoxUrl + mapBoxPlace + "?" + option + "&" + tokenParam;