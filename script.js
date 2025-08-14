async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "7e59df85e5cdb0adb7a779df6d3a69f8"; 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const weatherDataDiv = document.getElementById("weatherData");
  const errorMsg = document.getElementById("errorMsg");

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    // Fill in the data
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDataDiv.classList.remove("hidden");
    errorMsg.classList.add("hidden");

  } catch (error) {
    weatherDataDiv.classList.add("hidden");
    errorMsg.textContent = "❌ " + error.message;
    errorMsg.classList.remove("hidden");
  }
}
