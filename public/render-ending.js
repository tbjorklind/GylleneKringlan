"use strict"
export default renderCharacterAlternatives;
// --------------- NAMES AND IMAGES ---------------
const characterImages = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fanita_profil.png?alt=media&token=6bc4eb33-999e-4437-bcae-23913ee0c5fb",
    name: "Anita"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fapotekaren_profil.png?alt=media&token=9a81dc93-a1c2-42d4-bcc2-fa5e68c60808",
    name: "Apotekaren"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclemens_profil.png?alt=media&token=3887d165-63a6-4f5f-af5f-aec82652b2f7",
    name: "Clemens"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fhilda_profil.png?alt=media&token=353483b1-bb1c-4bfc-940d-7b989c0c6b47",
    name: "Hilda"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ftorparen_profil.png?alt=media&token=9bca13b5-9d20-455c-ab6a-509308c36d6e",
    name: "Torgaren Tage"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fcharlie_profil.png?alt=media&token=d18b4bf3-e7d3-42ec-a4f7-97ae0f1877cf",
    name: "Charlie"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ffiskaren_profil.png?alt=media&token=075182c3-cbe2-44e7-9244-c31bca4a481f",
    name: "Fiskaren"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fcasino_profil.png?alt=media&token=007f7cc2-f925-4333-a5fc-3dcdb35b4b37",
    name: "Spelaren"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ffreja_profil.png?alt=media&token=f81e2398-1311-41aa-b454-2db6f9d59b60",
    name: "Freja"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Froland_profil.png?alt=media&token=d53aef49-2889-4d14-873d-72444f2baf88",
    name: "Roland"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fdorrvakten_profil.png?alt=media&token=04294b06-03d5-4f61-afc7-c7e8fe1c8f86",
    name: "Dörrvakten"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbarbro_profil.png?alt=media&token=bde85f04-2f31-4fc6-bf87-c50c4477e633",
    name: "Barbro"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FvonAsklund_profil.png?alt=media&token=71c88188-24b2-4e50-ad6a-5e224649ae11",
    name: "Von Asklund"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fopera.png?alt=media&token=1ca30a3e-a524-4325-a995-643021a176c6",
    name: "Operasångerskan"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fprasten_profil.png?alt=media&token=1f5deca4-b738-40c4-aef9-1acbdfb3f2fa",
    name: "Prästen"
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Faugust_profil.png?alt=media&token=b79d6a24-adf7-4391-8294-3836a88e39a4",
    name: "Detektiven August"
  }

]

// ------------- RENDER CHARACTER ALTERNATIVES ---------------
// --------------- (START OF THE ENDING PART) ---------------
function renderCharacterAlternatives() {
  let header = document.createElement("div")
  header.id = "characterHeader";
  header.style.textAlign = 'center';
  header.innerHTML = "<span style='font-size: 5vw'>Vem har tagit den Gyllene Kringlan?</span><br><span style='font-size: 4.5vw;'>Välj er misstänkta tjuv!</span>"
  document.getElementById("wrapper").appendChild(header);

  let characterWrapper = document.createElement("div");
  characterWrapper.id = "characterWrapper"
  document.getElementById("wrapper").appendChild(characterWrapper);

  characterImages.forEach(c => {
    let characterDiv = document.createElement("div");
    let characterImg = document.createElement("div");
    let characterName = document.createElement("div");
    characterImg.style.backgroundImage = `url(${c.img})`;
    characterImg.style.backgroundColor = `var(--color${randomizeBackgroundColor()})`
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

function randomizeBackgroundColor() {
  let numbers = [2, 7, 10, 13, 15]

  let nr = Math.floor(Math.random() * 5) + 1;
  return numbers[nr - 1];
}

// --------------- DIRECT CODE ---------------
renderCharacterAlternatives()