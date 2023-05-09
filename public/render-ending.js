"use strict"
export default renderCharacterAlternatives;
// --------------- NAMES AND IMAGES ---------------
const characterImages = [
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Charlie"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Tage"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Von Asklund"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Freja"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  }
]

// ------------- RENDER CHARACTER ALTERNATIVES ---------------
// --------------- (START OF THE ENDING PART) ---------------
function renderCharacterAlternatives() {
  let header = document.createElement("div")
  header.id = "characterHeader";
  header.style.textAlign = 'center';
  header.innerHTML = "<span style='font-size: 4.5vw'>Vem har tagit den Gyllene Kringlan?</span><br><span style='font-size: 4.5vw;'>Välj er misstänkta tjuv!</span>"
  document.getElementById("wrapper").appendChild(header);

  let characterWrapper = document.createElement("div");
  characterWrapper.id = "characterWrapper"
  document.getElementById("wrapper").appendChild(characterWrapper);

  characterImages.forEach(c => {
    let characterDiv = document.createElement("div");
    let characterImg = document.createElement("div");
    let characterName = document.createElement("div");
    characterImg.style.backgroundImage = `url(${c.img})`;
    characterName.innerHTML = c.name;

    characterDiv.appendChild(characterImg);
    characterDiv.appendChild(characterName);
    characterWrapper.appendChild(characterDiv);

    characterDiv.addEventListener('click', () => { renderConfirmCharacter(c) })
  })
}

// --------------- POPUP CONFIRM CHOICE ---------------
function renderConfirmCharacter(character) {
  let popup = document.createElement("div");
  popup.id = 'confirmCharacter';
  popup.innerHTML = `
  <div>
    <img src="${character.img}">
    <div>Är ni säkra på att ${character.name} är tjuven?</div>
    <div id="confirmCharacterBtns">
      <div id="confirmYes">JA</div>
      <div id="confirmNo">NEJ</div>
    </div>
  </div>
  `;

  document.querySelector("body").appendChild(popup);

  document.getElementById("confirmYes").addEventListener('click', () => {
    checkChoice(character);
    popup.remove();
  })
  document.getElementById("confirmNo").addEventListener('click', () => { popup.remove() })
}

// --------------- CHECKING THE CHOSEN CHARACTER ---------------
function checkChoice(character) {
  if (character.name.toLowerCase() == "charlie")
    correctAnswer(character)
  else
    wrongAnswer(character)
}

// --------------- DISPLAY IF CORRECT CHARACTER ---------------
function correctAnswer(character) {
  document.getElementById("wrapper").innerHTML = `
  <div id="resultTop">
    <img src="https://www.onlygfx.com/wp-content/uploads/2018/04/busted-stamp-3.png">
  </div>
  <div id="resultBottom">
    <div>Charlie är tjuven!</div>
    <div>GRATTIS! Ni fångade tjuven och Hilda har sin kringla igen!</div>
  </div>
  `
  document.getElementById("resultTop").style.backgroundImage = `url(${character.img})`
  // Centrera allt vertikalt
  document.querySelector("wrapper").style.paddingTop = 0;
  document.querySelector("wrapper").style.display = "flex";
  document.querySelector("wrapper").style.justifyContent = "center";
}

// --------------- DISPLAY IF INCORRECT CHARACTER ---------------
async function wrongAnswer(character) {

  document.getElementById("wrapper").innerHTML = `
    <div id="resultTop">
      <img src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png">
    </div>
    <div id="resultBottom">
      <div>${character.name} är INTE tjuven!</div>
      <div>Den riktiga tjuven springer iväg i natten...</div>
    </div>
    `

  document.getElementById("resultTop").style.backgroundImage = `url(${character.img})`

  // Centrera allt vertikalt
  document.querySelector("wrapper").style.paddingTop = 0;
  document.querySelector("wrapper").style.display = "flex";
  document.querySelector("wrapper").style.justifyContent = "center";
}

// --------------- CALLED IF TIME HAS RUN OUT ---------------
function timeIsOut() {
  document.getElementById("wrapper").innerHTML = `
    <div id="resultTop">
      <img src="https://cdn.pixabay.com/photo/2021/08/27/19/20/thief-6579391_1280.png">
    </div>
    <div id="resultBottom">
      <div style="font-size: 8vw;">Tiden är ute!</div>
      <div>Solen har gått ner och den riktiga tjuven springer iväg i natten...</div>
    </div>
    `

  // Centrera allt vertikalt
  document.querySelector("wrapper").style.paddingTop = 0;
  document.querySelector("wrapper").style.display = "flex";
  document.querySelector("wrapper").style.justifyContent = "center";
}

// --------------- DIRECT CODE ---------------
renderCharacterAlternatives()