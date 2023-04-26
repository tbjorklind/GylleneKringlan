'use strict'
import { fireBaseFunctions } from './firebase.js';
import renderIntroAndQuestion from './render-storyline.js';

// ------------------- INITIALIZE PAGE ---------------------
; (() => {
  let startPageWrapper = document.createElement('div')
  startPageWrapper.id = 'startPageWrapper';
  startPageWrapper.innerHTML = `
  <div>GYLLENE KRINGLAN</div>
  <div>STARTA ÄVENTYRET!</div>
  `
  document.getElementById('wrapper').appendChild(startPageWrapper)

  document.querySelector("#startPageWrapper > div:last-child").addEventListener("click", () => {
    startPageWrapper.remove();
    renderChooseTeam();
  })

})();

// ------------------- RENDER TEAM SELECION ---------------------
function renderChooseTeam() {
  let teamWrapper = document.createElement('div')
  teamWrapper.id = 'teamWrapper'
  for (let i = 1; i <= 6; i++) {
    let teamBtn = document.createElement('img')
    teamBtn.src = `../images/team${i}.png`
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
      `;

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
  let backStory = ["Det var en gång en kringla...", "...som gillade att mingla!"];

  // Om backstoryn inte är klar, rendrera nästa sträng
  if (backStoryNr < backStory.length) {
    document.getElementById('backStoryTop').innerText = backStory[backStoryNr];
    document.getElementById('backStoryContinueBtn').addEventListener("click", () => { renderBackstory(teamNumber, backStoryNr + 1) })
  }

  // Om backstoryn är slut, anropa val av backpack
  if (backStoryNr == backStory.length) {
    renderChooseBackpack(teamNumber)
  }
}

// --------------------- RENDER BACKPACKS -----------------------
function renderChooseBackpack(teamNumber) {
  document.getElementById('wrapper').innerHTML = ''
  let backpackWrapper = document.createElement('div')
  backpackWrapper.id = 'teamWrapper'

  for (let i = 1; i <= 2; i++) {
    let backpackBtn = document.createElement('div')
    backpackBtn.innerHTML = 'Backpack ' + i
    backpackBtn.classList.add('teamBtn')
    backpackWrapper.appendChild(backpackBtn)

    backpackBtn.addEventListener('click', () => {
      fireBaseFunctions.addUserToBackpack('Teams', 'Team' + teamNumber, i)
      document.getElementById(
        'wrapper'
      ).innerHTML = `Du är med i team ${teamNumber}, ryggsäck ${i} <br> Rör er mot blå båten, Bobby har något viktigt att berätta...`
      localStorage.setItem("backpackNr", i)
      setTimeout(() => { renderIntroAndQuestion(0) }, 2000)
    })

  }

  document.getElementById('wrapper').appendChild(backpackWrapper)
}
