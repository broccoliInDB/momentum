const backgrounds = [
  {
    src: "images/night.jpg"
  }, {
    src: "images/sunset.jpg"
  }, {
    src: "images/night2.jpg"
  }, {
    src: "images/woods.jpg"
  }, {
    src: "images/hut.jpg"
  }, {
    src: "images/mountain.jpg"
  }
]
const USER_NAME = 'USER_NAME'
const body = document.body
const clock = body.querySelector('.clock > h1')

const getRandomBackground = () => {
  let result = backgrounds[Math.floor(Math.random() * backgrounds.length)].src
  return result
}

const setBackground = () => {
  const img = document.createElement('img')
  img.src = `${getRandomBackground()}`
  body.appendChild(img)
}

const init = () => {
  setBackground()
  setInterval(getRealTime, 1000)
  greeting()
}

window.addEventListener('load', init)
