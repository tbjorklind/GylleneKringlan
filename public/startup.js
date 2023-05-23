'use strict'
import { fireBaseFunctions } from './firebase.js'
import renderBackpackBtn from './backpack.js'
import startTimer from './index.js'
import { mapFunctions } from './map.js'
export default startup

// Arrow = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Farrow.png?alt=media&token=ca5376d1-1983-4452-b362-366c9c97747f
// team1 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam1.png?alt=media&token=71e2024a-f946-4ad1-a68a-5b72039d80ec
// team2 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam2.png?alt=media&token=bde2ceef-9418-4fae-9f0e-53f4b4c757f4
// team3 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam3.png?alt=media&token=ff221b9d-9835-430f-a3b6-b24e0dace568
// team4 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam4.png?alt=media&token=0d896616-996e-437e-b82f-236497074f68
// team5 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam5.png?alt=media&token=8ae9f5a8-26bf-487e-82d9-b87d3fa993ee
// team6 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam6.png?alt=media&token=8e404806-8f02-483c-9fa5-73d59445c622

// ------------------- INITIALIZE PAGE ---------------------
function startup() {
  let startPageWrapper = document.createElement('div')
  startPageWrapper.id = 'startPageWrapper'
  startPageWrapper.innerHTML = `
  <div></div>
  <div></div>
  `
  document.getElementById('wrapper').appendChild(startPageWrapper)

  document
    .querySelector('#startPageWrapper > div:last-child')
    .addEventListener('click', () => {
      startPageWrapper.remove()
      renderChooseTeam()
    })
}

// ------------------- RENDER TEAM SELECION ---------------------
function renderChooseTeam() {
  const btns = [
    'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam1.png?alt=media&token=8d083b94-f0c3-489c-8b60-360774f021cd',
    'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam2.png?alt=media&token=5dbddef1-46bc-46fd-add4-63861482152c',
    'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam3.png?alt=media&token=f1ca3423-b005-44f9-8c66-68d34f199243',
    'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam4.png?alt=media&token=d6abbf97-1ed3-499e-bc60-cae9f6df370d',
    'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam5.png?alt=media&token=538fff65-7d24-4a93-9201-a7332132abdc',
    'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam6.png?alt=media&token=b01db7f6-4507-4d7c-8287-da31f59db047'
  ]
  let teamTitle = document.createElement('div')
  teamTitle.innerText = 'Välj ditt lag!'
  teamTitle.style.fontSize = '5vw'
  teamTitle.style.position = 'absolute'
  teamTitle.style.top = '2vh'
  document.getElementById('wrapper').appendChild(teamTitle)

  let teamWrapper = document.createElement('div')
  teamWrapper.id = 'teamWrapper'
  for (let i = 1; i <= 6; i++) {
    let teamBtn = document.createElement('div')
    teamBtn.style.backgroundImage = 'url(' + btns[i - 1] + ')'
    teamBtn.classList.add('teamBtn')
    teamWrapper.appendChild(teamBtn)
    teamBtn.addEventListener('click', () => {
      fireBaseFunctions.addDocumentToFirebase('Users')

      // Prepare "frame" for backstory (så det inte behöver rendreras om och om igen, med tanke på att renderBackstory-funktionen anropar sig själv)
      document.getElementById('wrapper').innerHTML = ''
      document.getElementById('wrapper').innerHTML = `
        <div id="backStoryTop"></div>
        <div id="backStoryBottom">
          <div id="backStoryContinueBtn"></div>
        </div>
      `

      // Call render backstory to start backstory
      renderBackstory(i, 0)
    })
  }
  document.getElementById('wrapper').appendChild(teamWrapper)
}

// ------------------- RENDER BACKSTORY ---------------------
function renderBackstory(teamNumber, backStoryNr) {
  // Backstoryn i strängar, en sträng per "sida" alltså att man kommer till nästa
  // sträng när man klickar på vidare-pilen. Funktionen sköter sig själv så man kan
  // lägga till hur många strängar man än vill.
  let backStory = [
    `<div class="backstoryImg" style="background-image: url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fb1.png?alt=media&token=8bc1b0b5-a128-4029-a4fe-d53cf5ef0d54)"></div>`,
    `<div class="backstoryImg" style="background-image: url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fb2.png?alt=media&token=5dedfb78-c4ec-47ee-b723-51bad5abbc1b)"></div>`,
    `<div class="backstoryImg" style="background-image: url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fb3.png?alt=media&token=be2c2afd-dbd0-40e2-86a7-a110285506f1)"></div>`
  ]

  // Om backstoryn inte är klar, rendrera nästa sträng
  if (backStoryNr < backStory.length) {
    document.getElementById('backStoryTop').innerHTML = backStory[backStoryNr]
    document
      .getElementById('backStoryContinueBtn')
      .addEventListener('click', () => {
        renderBackstory(teamNumber, backStoryNr + 1)
      })
  }

  // Om backstoryn är slut, anropa val av backpack
  if (backStoryNr == backStory.length) {
    renderChooseBackpack(teamNumber)
  }
}

// --------------------- RENDER BACKPACKS -----------------------
function renderChooseBackpack(teamNumber) {
  document.getElementById('wrapper').innerHTML = ''

  let backpackTitle = document.createElement('div')
  backpackTitle.innerText = 'Välj din ryggsäck!'
  backpackTitle.style.fontSize = '5vw'
  backpackTitle.style.position = 'absolute'
  backpackTitle.style.top = '2vh'
  document.getElementById('wrapper').appendChild(backpackTitle)

  let backpackWrapper = document.createElement('div')
  backpackWrapper.id = 'teamWrapper'

  for (let i = 1; i <= 2; i++) {
    let teamQuality
    if (i == 1) teamQuality = 'SMARTA'
    if (i == 2) teamQuality = 'KLURIGA'
    let backpackBtn = document.createElement('div')
    // backpackBtn.innerHTML = 'Backpack ' + i
    backpackBtn.classList.add('teamBtn')
    backpackBtn.innerHTML = `<div></div><div>${teamQuality}</div>`
    backpackWrapper.appendChild(backpackBtn)

    backpackBtn.addEventListener('click', () => {
      fireBaseFunctions.addUserToBackpack('Teams', 'Team' + teamNumber, i)
      document.getElementById('wrapper').innerHTML = `
      <div id="backStoryTop">Låt jakten på den Gyllene Kringlan börja! Rör er mot Augusta Glass, det väntar nog någon där på er...</div>
      <div id="backStoryBottom">
        <div id="backStoryContinueBtn"></div>
      </div>`
      document
        .getElementById('backStoryContinueBtn')
        .addEventListener('click', () => {
          localStorage.setItem('backpackNr', i)
          mapFunctions.startInitMap()
          //renderIntroAndQuestion(0)
          renderBackpackBtn()
          startTimer()
        })
    })
  }

  document.getElementById('wrapper').appendChild(backpackWrapper)
}
