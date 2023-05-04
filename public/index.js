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

// Fixa så timer funkar korrekt - tanja <3
// Lägg till att opacity sänks - tanja <3
// Lägg till rätt bildlänkar - My <3
// Koppla ihop "spel" med karta - tsm <3
// Ytterligare göra appis mer lik "figma" - lägg in karaktärer, pratbubblor, använd rätt färger osv. My <3
// Zoonerna, logga när vi är "inom zoon" - tanja förbereder, testa/justera tsm <3
// "Gör slutet"

// Timer
let hour = 3
let minute = 0
let second = 0
let counter = document.getElementById('counter')

document.querySelector('body').style.backgroundColor = 'black'
document.querySelector('body').style.transition = 'background-color 10800s'

let interval = setInterval(() => {
  if (hour == 0 && minute == 0 && second == 0) {
    clearInterval(interval)
    counter.innerHTML = '0:00:00'
  } else {
    if (second == 0) {
      minute--
      second = 59

      if (minute < 0) {
        hour--
        minute = 59
      }
    } else {
      second--
    }

    if (minute.toString().length == 1) {
      minute = '0' + minute
    }
    if (second.toString().length == 1) {
      second = '0' + second
    }
    counter.innerHTML = hour + ':' + minute + ':' + second
  }
}, 1000)

const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()
