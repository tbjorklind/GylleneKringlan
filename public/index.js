import startup from "./startup.js"
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

// Height
const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

// Initiering av app
function onLaunch() {
  // If new user (no userId exists in local storage)
  if (!localStorage.getItem('userId')) {
    //startup()
  }
  // If the user is returning 
  else {
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
