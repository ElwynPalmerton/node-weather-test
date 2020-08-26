////////////////////////FRONTEND/////////////////////

console.log("JS loaded.")


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  const weatherURL = "http://localhost:3000/weather?address=" + location
  console.log(weatherURL);

  fetch(weatherURL)
    .then(response =>
      response.json())
    .then(data => {
      if (data.error) {
        console.log("ERROR: ", data.error);
        messageOne.textContent = "ERROR: ";
        messageTwo.textContent = data.error;
      } else {
        //Refactor sot hat it contains more weather information.
        messageOne.textContent = data.location;
        messageTwo.textContent = data.currentWeather.weather_descriptions[0];
      }
    });
}) 