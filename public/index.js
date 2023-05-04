// const arrow = document.querySelector('.arrow')
// const speed = document.querySelector('.speed-value')

// navigator.geolocation.getCurrentPosition(
//   position => {
//     console.log(position)
//     if (position.coords.speed) {
//       speed.textContent = position.coords.speed
//     } else {
//       speed.textContent = 'Funkar fan inte!!!'
//     }
//     if (position.coords.heading) {
//       arrow.style.transform = `rotate(${position.coords.heading}deg)`
//     }
//   },
//   error => {
//     console.error(error)
//   }
// )

// Timer
let hour = 2
let minute = 59
let second = 60
/*
setInterval(() => {
  if (minute == 0 && second == 1) {
    document.getElementById('counter').innerHTML = '0:00:00'
  } else {
    second--
    if (second == 0) {
      minute--
      second = 60;

      if (minute == 0) {
        hour--
        minute = minute
      }
    }

    if (minute.toString().length == 1) {
      minute = '0' + minute
    }
    if (second.toString().length == 1) {
      second = '0' + second
    }
    document.getElementById('counter').innerHTML =
      hour + ':' + minute + ':' + second
  }
}, 1000)
*/
//

const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()
