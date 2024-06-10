const apiKey = '06c645f4426eb6ecf030f68223f8c6ca'; 
const city = 'New Delhi'; 
async function fetchWeatherData() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching weather data: ' + error.message);
  }
}

async function displayWeatherGraph() {
  try {
    const weatherData = await fetchWeatherData();
    
    document.getElementById('city-name').textContent = weatherData.name + ', ' + weatherData.sys.country;

    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const pressure = weatherData.main.pressure;
    
    const canvas = document.getElementById('weatherChart');
    
    const weatherChart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Temperature', 'Humidity', 'Wind Speed', 'Pressure'],
        datasets: [{
          label: 'Weather Information',
          data: [temperature, humidity, windSpeed, pressure],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100 
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

displayWeatherGraph();
