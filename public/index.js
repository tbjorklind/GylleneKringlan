import startup from './startup.js'
import renderIntroAndQuestion from './render-storyline.js'
import { fireBaseFunctions } from './firebase.js';

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


  let timeRemaining = 3 * 60 * 60 * 1000 - (Date.now() - startTimestamp)

  let interval = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(interval)
      counter.innerHTML = '0:00:00'
      localStorage.removeItem('startTimestamp')
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

    renderIntroAndQuestion(storyChapter - 1)


    // GET STATE AND CALL FUNCTION <3<3<33<3<3<3<3
    // Ladda in kartan / kolla position
    // Kör som vanligt: om INTE inom zon, visa kartan. om INOM zon, renderera storyline/karaktär/fråga
    /*  PROBLEM: hur göra så att endast en mobil/person kan svara på frågorna.
        Kanske fortfarande uppmana att bara en person har mobil, men att man 
        kan ta in en ny mobil om den ena skulle dö. Sålänge dom bara spelar på 
        en mobil, typ.
        En lösning hade kunnat vara att när alla är inom zonen så blir en av
        personerna/mobilerna valda till att svara på frågorna. Detta innebär
        dock att vi måste "skicka ut" något, vilket vi inte vet hur man gör.
        Vi vet ju bara hur man hämtar saker och ting. 
        Ett annat alternativ hade varit att den första personen som kommer in
        i zonen får svara på frågorn på sin mobil. Dock innebär detta att man
        på något sätt måste skicka till databasen att denna personen är "utvald".
        Och om alla går in i zonen samtidigt så kommer "fetchandet" gentemot 
        datbasen kanske inte hinna med? Alternativt att när en person kommer
        innanför zonen kollar man i databasen: är någon person utvald för denna
        zonen? Om nej, så blir den personen vald och man får upp frågorna. Om ja
        så ska det typ stå på skärmen "någon annan i gruppen svarar på detta redan".
        Men för att dessa "passiva" användare/mobiler sen ska kunna ta sig vidare
        i spelet så måste vi konstant kolla databasen om storyChapter har ändrats
        (alltså att man har svarat klart på frågorna och ska vidare), eftersom att vi
        som sagt inte vet hur man skickar ut nått utan endast kan hämta. Ska man
        köra en set-timeout en gång i sekunden då, eller vad?
        Pilligt som fan! hihi! <3 
     */
  }
  startup()
}

onLaunch()
