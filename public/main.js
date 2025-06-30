document.getElementById('getLocationBtn').addEventListener('click', () => {
  const status = document.getElementById('status');
  const weatherDiv = document.getElementById('weather');

  if ('geolocation' in navigator) {
    status.textContent = 'Checking Weather...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = 'Weather fetched, loading to server...';

        // 1️⃣ Send location to your server (same as before)
        fetch('/send-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude }),
        })
        .then(response => response.json())
        .then(data => {
          status.textContent = 'Getting weather...';

          // 2️⃣ Call OpenWeatherMap API for real weather
          const apiKey = '4e982829a7d1d10118531d13489096af'; // <-- replace this!
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          return fetch(weatherUrl);
        })
        .then(response => response.json())
        .then(weatherData => {
          const city = weatherData.name;
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;

          status.textContent = 'Here’s your local weather:';
          weatherDiv.innerHTML = `
            <h3>Weather in ${city}</h3>
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${description}</p>
          `;
        })
        .catch(error => {
          status.textContent = 'Error getting weather.';
          console.error(error);
        });
      },
      (error) => {
        status.textContent = 'Unable to retrieve location.';
        console.error(error);
      }
    );
  } else {
    status.textContent = 'Geolocation is not supported by your browser.';
  }
});
