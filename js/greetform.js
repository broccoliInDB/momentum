const greet = body.querySelector('.greetFormJS h2')
const greetFormJS = body.querySelector('.greetFormJS')
const greetUserEdit = body.querySelector('.edit')

const getGreeting = () => {
  const current = new Date()
  const offsets = getOffsets()
  if (current > offsets.morningStart && current <= offsets.afternoonStart) {
    return '☀️ Good morning! '
  } else if (current > offsets.afternoonStart && current <= offsets.eveningStart) {
    return '🍱 Good afternoon! '
  } else if (current > offsets.eveningStart && current <= offsets.nightStart) {
    return '🌆 Good evening! '
  } else {
    return '🌃 Good night! '
  }
}

const greeting = () => {
  const selectedGreeting = getGreeting()
  const user = localStorage.getItem(USER_NAME)
  const userNameInput = greetFormJS.querySelector('input')
  if (!user) {
    greetFormJS.classList.add('isNoUser')
    userNameInput.classList.remove('hidden')
    greetUserEdit.classList.remove('show')
    greet.textContent = `What is your name???`
  } else {
    greetFormJS.classList.remove('isNoUser')
    greetUserEdit.classList.add('show')
    userNameInput.classList.add('hidden')

    greet.textContent = `${selectedGreeting} ${user}`
  }
}

const getOffsets = () => {
  const offsets = {
    morningStart: new Date().setHours(05, 00, 00),
    afternoonStart: new Date().setHours(12, 00, 00),
    eveningStart: new Date().setHours(18, 00, 00),
    nightStart: new Date().setHours(22, 00, 00)
  }

  return offsets
}

const getRealTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  clock.textContent = time
}

const saveUser = (evt) => {
  evt.preventDefault()
  const target = evt.target
  const userName = target.querySelector('input')
  localStorage.setItem(USER_NAME, userName.value)
  userName.value = ''
  greeting()
}

const userEditHandler = (evt) => {
  const target = evt.target
  if (!target.closest('.edit')) return
  const popover = greetUserEdit.querySelector('.edit__popover')
  const popoverEdge = greetUserEdit.querySelector('.edit__popoverEdge')
  popover.classList.toggle('show')
  popoverEdge.classList.toggle('show')

  const greetUserEditBtn = target.closest('.edit__popover')
  if (greetUserEditBtn) {
    localStorage.setItem(USER_NAME, '')
    greeting()
  }
}

greetFormJS.addEventListener('submit', saveUser)
greetUserEdit.addEventListener('click', userEditHandler)