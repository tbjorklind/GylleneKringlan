'use strict'
import { fireBaseFunctions } from './firebase.js';
import renderIntroAndQuestion from './render-storyline.js';
import renderBackpackBtn from './backpack.js';

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

// Arrow = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Farrow.png?alt=media&token=ca5376d1-1983-4452-b362-366c9c97747f
// team1 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam1.png?alt=media&token=71e2024a-f946-4ad1-a68a-5b72039d80ec
// team2 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam2.png?alt=media&token=bde2ceef-9418-4fae-9f0e-53f4b4c757f4
// team3 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam3.png?alt=media&token=ff221b9d-9835-430f-a3b6-b24e0dace568
// team4 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam4.png?alt=media&token=0d896616-996e-437e-b82f-236497074f68
// team5 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam5.png?alt=media&token=8ae9f5a8-26bf-487e-82d9-b87d3fa993ee
// team6 = https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam6.png?alt=media&token=8e404806-8f02-483c-9fa5-73d59445c622



// ------------------- RENDER TEAM SELECION ---------------------
function renderChooseTeam() {
  const btns = ["https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam1.png?alt=media&token=71e2024a-f946-4ad1-a68a-5b72039d80ec",
    "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam2.png?alt=media&token=bde2ceef-9418-4fae-9f0e-53f4b4c757f4",
    "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam3.png?alt=media&token=ff221b9d-9835-430f-a3b6-b24e0dace568",
    "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam4.png?alt=media&token=0d896616-996e-437e-b82f-236497074f68",
    "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam5.png?alt=media&token=8ae9f5a8-26bf-487e-82d9-b87d3fa993ee",
    "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fteam6.png?alt=media&token=8e404806-8f02-483c-9fa5-73d59445c622"
  ]
  let teamTitle = document.createElement('div');
  teamTitle.innerText = "Välj ditt lag!"
  teamTitle.style.marginTop = '5vw'
  teamTitle.style.fontSize = '5vw'
  document.getElementById('wrapper').appendChild(teamTitle)

  let teamWrapper = document.createElement('div')
  teamWrapper.id = 'teamWrapper'
  for (let i = 1; i <= 6; i++) {
    let teamBtn = document.createElement('div')
    teamBtn.style.backgroundImage = "url(" + btns[i - 1] + ")";
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
      setTimeout(() => {
        renderIntroAndQuestion(0)
        renderBackpackBtn()
      }, 2000)
    })

  }

  document.getElementById('wrapper').appendChild(backpackWrapper)
}
