import startup from './startup.js'
import renderIntroAndQuestion from './render-storyline.js'
import { fireBaseFunctions } from './firebase.js';
import renderBackpackBtn from './backpack.js'
import startInitMap from './map.js';
import { renderEnding } from './render-ending.js';

export default startTimer;
// KOMMENTERA TILLBAKA!!!!!!!!!!!!

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
function startTimer() {
  let startTimestamp = localStorage.getItem('startTimestamp')
  if (!startTimestamp) {
    startTimestamp = Date.now()
    localStorage.setItem('startTimestamp', startTimestamp)
  }

  let body = document.body;
  let initialOpacity = 0;
  let opacityStep = 1 / (3 * 60 * 60);

  let timeRemaining = 3 * 60 * 60 * 1000 - (Date.now() - startTimestamp)

  let interval = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(interval)
      counter.innerHTML = '0:00:00'
      localStorage.removeItem('startTimestamp')
      renderEnding.timeIsOut()
    } else {
      let hours = Math.floor(timeRemaining / (60 * 60 * 1000))
      let minutes = Math.floor((timeRemaining / (60 * 1000)) % 60)
      let seconds = Math.floor((timeRemaining / 1000) % 60)

      if (minutes.toString().length == 1) {
        minutes = '0' + minutes
      }
      if (seconds.toString().length == 1) {
        seconds = '0' + seconds
      }

      counter.innerHTML = hours + ':' + minutes + ':' + seconds

      body.style.backgroundColor = `rgba(0, 0, 0, ${initialOpacity})`;
      initialOpacity += opacityStep;

      timeRemaining -= 1000
    }
  }, 1000)
}

// Height
const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

// Initiering av app
async function onLaunch() {
  // If new user (no userId exists in local storage)
  if (!localStorage.getItem('userId')) {
    startup()
  }
  // If the user is returning
  else {
    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let userBackpack = localStorage.getItem('backpackNr');
    let doc = await fireBaseFunctions.getDocumentFromFirestore('Teams', userTeamId);
    let storyChapter;


    if (userBackpack == 1) {
      storyChapter = doc.backpack1.storyChapter;
    }
    if (userBackpack == 2) {
      storyChapter = doc.backpack2.storyChapter;
    }

    if (storyChapter >= 0) {
      // Kanske bättre att köra kartan, så den kollar: om inom zon, ladda story. Annars visa kartan.
      await renderIntroAndQuestion(storyChapter)
      //startInitMap()
      renderBackpackBtn()
      startTimer()
    }
    else
      startup()
  }
  //startup()
}

onLaunch()
