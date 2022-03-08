const body = document.querySelector('body');
const message = document.createElement('div');
const container = document.createElement('div');
const temp = document.createElement('div');
const heading = document.createElement('div');
const type = document.createElement('div');
const highLow = document.createElement('div');

async function getWeather() {

  if(!navigator.geolocation) {
    message.textContent = 'Location not supported';
    body.appendChild(message);
    return
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  async function onSuccess(position) {
    const {
        latitude,
        longitude
    } = position.coords;

    message.classList.add('success');
    message.textContent = `Your location: (${latitude},${longitude})`;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=30ac3e4108b5532a9f3a8af775fe29ce`, {mode: 'cors'});
    const weatherData = await response.json();
    heading.textContent = weatherData.name;

    type.textContent = weatherData.weather[0].main

    function conversion(temp) {
      return Math.round((temp - 273.15) * (9/5) + 32);
    }

    const temperature = conversion(weatherData.main.temp);
    temp.textContent = `${temperature} °F`

    const high = conversion(weatherData.main.temp_max);
    const low = conversion(weatherData.main.temp_min);
    highLow.textContent = `High: ${high}°F | Low: ${low} °F`

    container.classList.add('container');
    container.appendChild(heading);
    container.appendChild(type);
    container.appendChild(temp);
    container.appendChild(highLow);

    body.appendChild(container)


    console.log(weatherData);
  }

  // handle error case
  async function onError() {
      message.classList.add('error');
      message.textContent = `Failed to get your location!`;
  }

}

getWeather();