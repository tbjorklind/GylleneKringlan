"use strict"

/* 
När man väl är framme vid slutet ska:
    - Alla karaktärer rendreras och man uppmanas att välja sin tjuv 
      OBS!! Endast på EN av mobilerna!! Annars kan dom ju gissa två ggr, å det vill vi inte... väl?
    – Om man gissar rätt visas det att man lyckas
    – Om man gissar fel får man frågan om man vill muta för en till gissning 
        – Om man gissar rätt visas samma som ovan, att man lyckats
        – Om man gissar fel igen eller accepterar nederlaget visas det att man förlorat  
    – Och tillsist en vy om man inte hinner klart innan tiden är slut
*/

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


function renderCharacterAlternatives() {
  // Header
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

function checkChoice(character) {
  if (character.name.toLowerCase() == "charlie")
    correctAnswer(character)
  else
    wrongAnswer(character)
}

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

  // Centrera allt vertikalt
  document.querySelector("wrapper").style.paddingTop = 0;
  document.querySelector("wrapper").style.display = "flex";
  document.querySelector("wrapper").style.justifyContent = "center";
}

function wrongAnswer(character) {
  document.getElementById("wrapper").innerHTML = `
  <div id="resultTop">
    <img src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png">
  </div>
  <div id="resultBottom">
    <div>${character.name} är INTE tjuven!</div>
    <div>Den riktiga tjuven springer iväg i natten...</div>
  </div>
  `

  // Centrera allt vertikalt
  document.querySelector("wrapper").style.paddingTop = 0;
  document.querySelector("wrapper").style.display = "flex";
  document.querySelector("wrapper").style.justifyContent = "center";
}

renderCharacterAlternatives()



/*
TO DO
- Snygga till allt
- Lägg in rätt namn och tillhörande bilder på karaktärerna
- Lägg till möjlighet att betala med mynt för en gissning till
- En vy för om tiden tagit slut 
- Ordentliga busted och failed stämplar
- Koppla ihop med resten av spelet (ska ej vara en egen URL)
- Se till att höjden fungerar ordentlige på mobil

*/