const COORDS = 'coords'
const API_KEY = '4fc7c6bf28b8c0205291dee999b7262c'
const weather = document.querySelector('.weather')

const saveCoordsInfo = (coordsInfo) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsInfo))
}

const handleGetCoordsSuccess = (position) => {
  const { latitude, longitude } = position.coords
  const coordsInfo = {
    latitude, longitude
  }
  saveCoordsInfo(coordsInfo)
  getWeather(latitude, longitude)
}

const handleGetCoordsError = () => {
  console.log('Error while getting geolocation!')
}

const getForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGetCoordsSuccess, handleGetCoordsError)
}

const getWeather = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  ).then(response => {
    return response.json()
  }).then(data => {
    weather.innerText = `${data.main.temp}℃ @ ${data.name}`
  })
}

const loadCoords = () => {
  const coordInfo = localStorage.getItem(COORDS)
  if (!coordInfo) {
    getForCoords()
  } else {
    const coordsInfo = JSON.parse(localStorage.getItem(COORDS))
    getWeather(coordsInfo.latitude, coordsInfo.longitude)
  }
}

window.addEventListener('load', loadCoords)